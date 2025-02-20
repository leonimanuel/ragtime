import { generateObject, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { GroupedContainerSchema } from '@/lib/schemas/groupedContainer';
import { use } from 'react';

export async function POST(req: Request) {
  const body = await req.json();
    
  if (!body.context) {
    return new Response(JSON.stringify({ error: 'Missing context in request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const context = body.context;
  const result = await streamObject({
    model: openai('gpt-4'),
    system: `You generate a system context diagram for a system.
            Important rules:
            - Each container can have a maximum of 3 technologies
            - Keep technology descriptions simple and high-level
            - Focus on the main/primary technologies used
            - Use container names as identifiers in relationships`,
    prompt: 'Generate a system context diagram for a system based on the following questionnaire: ' + context,
    schema: GroupedContainerSchema,
  });

  return result.toTextStreamResponse();
  // return new Response(JSON.stringify({ message: 'Object generated successfully' }), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
}