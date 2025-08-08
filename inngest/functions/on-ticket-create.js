import { inngest } from "../client";
import Ticket from "../../models/ticket.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer";

export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2},
    { event: "ticket/created" },

    async ({event, step}) => {
        try {
            const {ticketId} = event.data

            //fetch ticket from DB
            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if (!ticket) {
                    throw new NonRetriableError("Ticket not found");
                }
                return ticketObject
            })

            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, {
                status: "TODO"})
            })

            const aiResponse = await analyzeTicket(ticket)


        } catch (error) {
            
        }
}



)