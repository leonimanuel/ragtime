'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { coreQuestions } from './api/chat/mock-data';
import { QuestionAnswers } from './types/QuestionAnswers';

const questions = coreQuestions;

const generateRandomAnswers = () => {
  return questions.map(question => {
    const numAnswers = Math.floor(Math.random() * question.answers.length) + 1; // At least 1 answer
    const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
    const selectedAnswers = shuffledAnswers.slice(0, numAnswers);
    
    return {
      question: question.question,
      selectedAnswers: selectedAnswers
    };
  });
};

export function Questionnaire(
  { onSubmit }: { onSubmit: (answers: QuestionAnswers[]) => void }
) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [answers, setAnswers] = useState<QuestionAnswers[]>(generateRandomAnswers());
  const [answers, setAnswers] = useState<QuestionAnswers[]>([]);
  const cardContentRef = useRef<HTMLDivElement>(null);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleValueChange = (questionIndex: number, value: string[]) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = {
        question: questions[questionIndex].question,
        selectedAnswers: value
      };
      return newAnswers;
    });
  };

  const handleNext = () => {
    // Only proceed if current question has at least one answer
    if (answers[currentQuestionIndex]?.selectedAnswers.length > 0) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <div className="flex gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  index <= currentQuestionIndex && "bg-primary",
                  index === currentQuestionIndex && "animate-pulse",
                  index > currentQuestionIndex && "bg-muted"
                )}
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent ref={cardContentRef}>
        <div className="space-y-8">
          {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold">{question.question}</h2>
              <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2"
                value={answers[index]?.selectedAnswers || []}
                onValueChange={(value) => handleValueChange(index, value)}
              >
                {question.answers.map((option) => (
                  <ToggleGroupItem
                    key={option}
                    value={option}
                    className="flex-none px-4 py-2 border-2 border-primary/50 hover:border-primary 
                        data-[state=on]:bg-primary data-[state=on]:text-primary-foreground 
                        data-[state=on]:border-primary rounded-full transition-colors"
                    aria-label={option}
                  >
                    {option}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}

          <div className="flex justify-end">
            {isLastQuestion ? (
              <Button
                onClick={() => onSubmit(answers)}
                disabled={!answers[currentQuestionIndex]?.selectedAnswers.length}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestionIndex]?.selectedAnswers.length}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 