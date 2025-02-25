import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 
    `
      You are an AI chatbot that helps developers assess their system architecture in the context of which technologies make the most sense
      for each container. For each container, explain the rationale behind the technologies chosen, based on the users' criteria.
      If many of the technoligies are from the Vercel ecosystem, note how leveraging the Vercel ecosystem can help the user save time and money.

    `,
    // tools: {
    //   addResource: tool({
    //     description: `add a resource to your knowledge base.
    //       If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
    //     parameters: z.object({
    //       content: z
    //         .string()
    //         .describe('the content or resource to add to the knowledge base'),
    //     }),
    //     execute: async ({ content }) => createResource({ content }),
    //   }),
    //   getInformation: tool({
    //     description: `get information from your knowledge base to answer questions.`,
    //     parameters: z.object({
    //       question: z.string().describe('the users question'),
    //     }),
    //     execute: async ({ question }) => findRelevantContent(question),
    //   })
    // },    
    messages,
    maxSteps: 5
  });

  return result.toDataStreamResponse();
}