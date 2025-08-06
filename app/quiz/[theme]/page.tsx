"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, Star, Trophy } from 'lucide-react'
import Link from "next/link"
import { useParams } from "next/navigation"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

const quizData: Record<string, { title: string; questions: Question[] }> = {
  continents: {
    title: "Continents Quiz",
    questions: [
      {
        id: 1,
        question: "Which is the largest continent by area?",
        options: ["Africa", "Asia", "North America", "Europe"],
        correctAnswer: 1,
        explanation: "Asia is the largest continent, covering about 30% of Earth's land area!",
        difficulty: "easy"
      },
      {
        id: 2,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia/Oceania.",
        difficulty: "easy"
      },
      {
        id: 3,
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Africa", "South America", "Antarctica"],
        correctAnswer: 1,
        explanation: "Africa was historically called the 'Dark Continent' because it was largely unexplored by Europeans.",
        difficulty: "medium"
      }
    ]
  },
  capitals: {
    title: "Capital Cities Quiz",
    questions: [
      {
        id: 1,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: 2,
        explanation: "Canberra is the capital of Australia, even though Sydney and Melbourne are larger cities!",
        difficulty: "medium"
      },
      {
        id: 2,
        question: "Which city is the capital of Japan?",
        options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
        correctAnswer: 1,
        explanation: "Tokyo is Japan's capital and one of the world's largest metropolitan areas.",
        difficulty: "easy"
      }
    ]
  }
}

export default function QuizPage() {
  const params = useParams()
  const theme = params.theme as string
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const quiz = quizData[theme]
  const questions = quiz?.questions || []
  const question = questions[currentQuestion]

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Quiz Not Found</h2>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)
    
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      setShowResult(true)
    }
  }

  const showQuestionResult = () => {
    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (currentQuestion >= questions.length && showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    const isExcellent = percentage >= 80
    const isGood = percentage >= 60

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {isExcellent ? (
                  <Trophy className="w-16 h-16 text-yellow-500" />
                ) : isGood ? (
                  <Star className="w-16 h-16 text-blue-500" />
                ) : (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                )}
              </div>
              <CardTitle className="text-3xl font-bold">
                {isExcellent ? "Excellent Work! 🎉" : isGood ? "Great Job! 👏" : "Good Effort! 💪"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-blue-600">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-600">
                You scored {percentage}%
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-700">Correct</div>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{questions.length - score}</div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  Try Again
                </Button>
                <Link href="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <Badge variant="secondary" className="bg-white/90">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-gray-700">{quiz.title}</h2>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge 
                variant={question.difficulty === "easy" ? "secondary" : question.difficulty === "medium" ? "default" : "destructive"}
                className="text-xs"
              >
                {question.difficulty.toUpperCase()}
              </Badge>
              <div className="text-sm text-gray-500">Score: {score}/{currentQuestion}</div>
            </div>
            <CardTitle className="text-xl md:text-2xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="grid gap-3">
              {question.options.map((option, index) => {
                let buttonClass = "justify-start text-left h-auto p-4 text-base"
                
                if (showResult) {
                  if (index === question.correctAnswer) {
                    buttonClass += " bg-green-100 border-green-500 text-green-700"
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    buttonClass += " bg-red-100 border-red-500 text-red-700"
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += " bg-blue-100 border-blue-500"
                }

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      )}
                      {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </Button>
                )
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                  <p className="text-blue-700">{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <div></div>
              {!showResult ? (
                <Button 
                  onClick={showQuestionResult}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-green-500 to-blue-600"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
