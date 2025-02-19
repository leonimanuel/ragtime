import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';
import { systemPrompts } from './system-prompts';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    // system: 
    // `
    //   You are an AI chatbot that helps developers design system architectures using the C4 model 
    //   and recommends the most suitable tech stack based on their input. 
    //   Your responses must be structured, concise, and strictly follow a predefined question flow.

    //   Ask one question from the list of CORE QUESTIONSat a time, in a strict sequence (no skipping, backtracking, or reordering).
    //   If the user's response is ambiguous or incomplete, ask for clarification before proceeding.

    //   The CORE QUESTIONS are:
    //   ${systemPrompts.coreQuestions.map(q => q.question).join('\n')}
    // `,
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
  });

  return result.toDataStreamResponse();
}