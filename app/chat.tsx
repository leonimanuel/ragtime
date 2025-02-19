'use client';

import { useChat, useCompletion } from '@ai-sdk/react';
import { systemPrompts } from './api/chat/system-prompts';
import { QuestionAnswers } from './types/QuestionAnswers';
import { openai } from '@ai-sdk/openai';
import { useEffect } from 'react';
export default function Chat(
  { questionsAnswers }: { questionsAnswers: string }
) {
  const chat = useChat({
    // maxSteps: 3,
    // body: {
    //   questionnaire_answers: questionsAnswers
    // },
  });

  useEffect(() => {
    chat.append({
      id: '1',
      role: 'system',
      content: questionsAnswers
    });
  }, []);

  return (
    <>
      <div className="space-y-4">
        {chat.messages.map(m => (
          m.role != "system" ? (
            <div key={m.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{m.role}</div>
                <p>
                  {m.content.length > 0 ? (
                    m.content
                  ) : (
                    <span className="italic font-light">
                      {'calling tool: ' + m?.toolInvocations?.[0].toolName}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : null
        ))}
      </div>

      <form onSubmit={chat.handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={chat.input}
          placeholder="Say something..."
          onChange={chat.handleInputChange}
        />
      </form>
    </>
  );
}
