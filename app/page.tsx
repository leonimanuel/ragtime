'use client';

import { useChat, useCompletion } from '@ai-sdk/react';
import { Weather } from '@/components/weather';
import { openai } from '@ai-sdk/openai';
import { useState } from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Questionnaire } from './questionnaire';
import { GroupedContainerSchema } from '@/lib/schemas/groupedContainer';
import { mockGroupedContainer } from './api/object/mockGroupedContainer';
import { GroupedContainer, GroupedContainerProps } from '@/components/GroupedContainer';
import { QuestionAnswers } from './types/QuestionAnswers';
import { MemoizedMarkdown } from '@/components/memoized-markdown';
export default function Page(
) {
  const [questionsAnswers, setQuestionsAnswers] = useState<string>('');
  // let aiObject = {
  //   object: mockGroupedContainer
  // }

  let mockObject = mockGroupedContainer;
  const handleQuestionnaireSubmit = (answers: QuestionAnswers[]) => {
    const answersString = JSON.stringify(answers);
    // console.log("SUBMITTING OBJECT: ", answersString);
    aiObject.submit({ context: answersString });
    // mockObject = generateSystemContextMockResponse;
  };  
  
  const chat = useChat({
    // maxSteps: 3,
  });

  let aiObject = useObject({
    api: '/api/object',
    schema: GroupedContainerSchema,
    onFinish: (object) => {
      chat.append({
        role: "system",
        content: JSON.stringify(object),
      });
    }
  });

  const { messages, input, handleInputChange, handleSubmit } = chat;
  return (
    <div className="flex flex-col items-center w-full py-24 mx-auto stretch">
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="w-1/2">
          <Questionnaire onSubmit={handleQuestionnaireSubmit} />
        </div>
        
        {aiObject.object && aiObject?.object?.groups && (
          <div className="w-3/4">
            <GroupedContainer {...aiObject.object as GroupedContainerProps} />
          </div>
        )}

        <div className="w-1/2">
          {messages.map(message => (
            message.role != "system" ? (
              <div key={message.id} className="whitespace-pre-wrap">
                <div>
                  <div className="font-bold">{message.role}</div>                
                  <div className="">
                    {message.content.length > 0 ? (
                      <MemoizedMarkdown content={message.content} id={message.id} />
                    ) : (
                      <span className="italic font-light">
                        {'calling tool: ' + message?.toolInvocations?.[0].toolName}
                      </span>
                    )}
                  </div>
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
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form> */}
    </div>
  );
}
