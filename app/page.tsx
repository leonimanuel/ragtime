'use client';

import { systemPrompts } from './api/chat/system-prompts';
import Questionnaire from './questionnaire';
import { QuestionAnswers } from './types/QuestionAnswers';
import { useState } from 'react';
import Chat from './chat';  

export default function HomePage() {
  const [questionsAnswers, setQuestionsAnswers] = useState<string>('');

  const handleQuestionnaireSubmit = (answers: QuestionAnswers[]) => {
    //stringify answers
    const answersString = JSON.stringify(answers);
    console.log(answersString);
    setQuestionsAnswers(answersString);
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <Questionnaire onSubmit={handleQuestionnaireSubmit} />
      {questionsAnswers && <Chat questionsAnswers={questionsAnswers} />}
    </div>
  );
}
