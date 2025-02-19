'use client';

import { useChat, useCompletion } from '@ai-sdk/react';
import { Weather } from '@/components/weather';
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

  // useEffect(() => {
  //   chat.append({
  //     id: '1',
  //     role: 'system',
  //     content: questionsAnswers
  //   });
  // }, []);

  const { messages, input, handleInputChange, handleSubmit } = chat;
  return (
    <>
      <div className="space-y-4">
        {messages.map(message => (
          message.role != "system" ? (
            <div key={message.id} className="whitespace-pre-wrap">
              <div>
                <div className="font-bold">{message.role}</div>
                <p>
                  {message.content.length > 0 ? (
                    message.content
                  ) : (
                    <span className="italic font-light">
                      {'calling tool: ' + message?.toolInvocations?.[0].toolName}
                    </span>
                  )}
                </p>
              </div>

              <div>
                {message.toolInvocations?.map(toolInvocation => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  if (state === 'result') {
                    if (toolName === 'displayWeather') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <Weather {...result} />
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div key={toolCallId}>
                        {toolName === 'displayWeather' ? (
                          <div>Loading weather...</div>
                        ) : null}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ) : null
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}
