import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  // Create a new message and trigger the background job
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "Message cannot be empty" }),
      })
    )
    .mutation(async ({ input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
        },
      });

      return createdMessage;
    }),

  // Fetch all messages
  getMany: baseProcedure.query(async () => {
    return await prisma.message.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
});
