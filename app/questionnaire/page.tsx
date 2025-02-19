'use client';

import { useState, useRef, useEffect } from 'react';
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
  const cardContentRef = useRef<HTMLDivElement>(null);
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleValueChange = (questionIndex: number, value: string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const scrollToBottom = () => {
    if (cardContentRef.current) {
      const container = cardContentRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to bottom whenever a new question is added
  useEffect(() => {
    // Small delay to ensure new content is rendered
    setTimeout(scrollToBottom, 100);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    // Only proceed if current question has at least one answer
    if (answers[currentQuestionIndex]?.length > 0) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    // Only submit if current question has at least one answer
    if (answers[currentQuestionIndex]?.length > 0) {
      console.log('All answers:', answers);
    }
  };

  return (
    <div className="container p-8">
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
        <CardContent ref={cardContentRef} className="max-h-[80vh] overflow-y-auto">
          <div className="space-y-8">
            {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-semibold">{question.question}</h2>
                <ToggleGroup 
                  type="multiple" 
                  className="flex flex-wrap gap-2"
                  value={answers[index] || []}
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
                  onClick={handleSubmit} 
                  disabled={!answers[currentQuestionIndex]?.length}
                >
                  Submit
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  disabled={!answers[currentQuestionIndex]?.length}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 