'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { coreQuestions } from '../api/chat/system-prompts';

// Example questions and options - you can replace with your actual data
const questions = coreQuestions;

export default function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleValueChange = (value: string[]) => {
    setSelectedOptions(value);
  };

  const handleNext = () => {
    // Save current answers
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedOptions
    }));

    // Clear selections for next question
    setSelectedOptions([]);

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);

    // Scroll the new question into view
    setTimeout(() => {
      const newQuestion = document.getElementById(`question-${currentQuestionIndex + 1}`);
      newQuestion?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = () => {
    const finalAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedOptions
    };
    console.log('All answers:', finalAnswers);
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="space-y-8">
        {questions.slice(0, currentQuestionIndex + 1).map((question, index) => {
          const isCurrentQuestion = index === currentQuestionIndex;
          const isAnswered = index < currentQuestionIndex;
          const questionAnswers = answers[index] || [];

          return (
            <Card
              key={index}
              id={`question-${index}`}
              className={cn(
                "transition-all duration-300",
                isAnswered && "bg-muted"
              )}
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1} of {questions.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">{question.question}</h2>
                  {isAnswered ? (
                    <div className="flex flex-wrap gap-2">
                      {questionAnswers.map((answer) => (
                        <div
                          key={answer}
                          className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm"
                        >
                          {answer}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ToggleGroup 
                      type="multiple" 
                      className="flex flex-col gap-2"
                      value={selectedOptions}
                      onValueChange={handleValueChange}
                    >
                      {question.answers.map((option) => (
                        <ToggleGroupItem
                          key={option}
                          value={option}
                          className="w-full justify-start px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                          aria-label={option}
                        >
                          {option}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                  {isCurrentQuestion && (
                    <div className="flex justify-end pt-4">
                      {isLastQuestion ? (
                        <Button onClick={handleSubmit} disabled={selectedOptions.length === 0}>
                          Submit
                        </Button>
                      ) : (
                        <Button onClick={handleNext} disabled={selectedOptions.length === 0}>
                          Next
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 