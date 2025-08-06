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

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
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
      // Quiz completed - show final results
      setTimeout(() => {
        setCurrentQuestion(questions.length) // This will trigger the results screen
      }, 1500) // Small delay to show the last question result
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
    const isExcellent = percentage >= 90
    const isGood = percentage >= 70
    const isOkay = percentage >= 50

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-6 relative">
                {isExcellent ? (
                  <div className="relative">
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
                    <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🎉</div>
                  </div>
                ) : isGood ? (
                  <div className="relative">
                    <Star className="w-20 h-20 text-blue-500 mx-auto animate-pulse" />
                    <div className="absolute -top-1 -right-1 text-xl">⭐</div>
                  </div>
                ) : isOkay ? (
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                ) : (
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">📚</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-4xl font-bold mb-2">
                {isExcellent ? "Outstanding! 🌟" : 
                 isGood ? "Great Job! 👏" : 
                 isOkay ? "Good Effort! 💪" : 
                 "Keep Learning! 📖"}
              </CardTitle>
              <p className="text-lg text-gray-600">
                {isExcellent ? "You're a geography superstar!" :
                 isGood ? "You really know your geography!" :
                 isOkay ? "You're on the right track!" :
                 "Practice makes perfect!"}
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              {/* Score Display */}
              <div className="relative">
                <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {score}/{questions.length}
                </div>
                <div className="text-2xl text-gray-600 mt-2">
                  {percentage}% Correct
                </div>
                {percentage >= 80 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-2xl animate-bounce">🎯</span>
                  </div>
                )}
              </div>
            
              {/* Detailed Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-1">{score}</div>
                  <div className="text-green-700 font-medium">Correct Answers</div>
                  <div className="text-green-600 text-sm mt-1">Great work! 🎉</div>
                </div>
                <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-red-600 mb-1">{questions.length - score}</div>
                  <div className="text-red-700 font-medium">Incorrect</div>
                  <div className="text-red-600 text-sm mt-1">Room to improve 📈</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{percentage}%</div>
                  <div className="text-blue-700 font-medium">Final Score</div>
                  <div className="text-blue-600 text-sm mt-1">
                    {percentage >= 90 ? "Excellent! 🌟" :
                     percentage >= 70 ? "Very Good! 👍" :
                     percentage >= 50 ? "Good! 😊" : "Keep trying! 💪"}
                  </div>
                </div>
              </div>

              {/* Performance Message */}
              <Card className={`max-w-md mx-auto ${
                isExcellent ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300" :
                isGood ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300" :
                isOkay ? "bg-gradient-to-r from-green-100 to-teal-100 border-green-300" :
                "bg-gradient-to-r from-orange-100 to-red-100 border-orange-300"
              } border-2`}>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg mb-2">
                    {isExcellent ? "🏆 Geography Master!" :
                     isGood ? "⭐ Well Done!" :
                     isOkay ? "📚 Keep Learning!" :
                     "🎯 Try Again!"}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {isExcellent ? "You've mastered this topic! Ready for the next challenge?" :
                     isGood ? "You have a solid understanding of geography. Keep it up!" :
                     isOkay ? "You're making progress! Review the explanations and try again." :
                     "Don't give up! Every expert was once a beginner."}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  onClick={resetQuiz} 
                  variant="outline" 
                  size="lg"
                  className="bg-white hover:bg-gray-50 border-2 border-gray-300"
                >
                  <span className="mr-2">🔄</span>
                  Try Again
                </Button>
                <Link href={`/quiz/${theme}`}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white hover:bg-gray-50 border-2 border-blue-300"
                  >
                    <span className="mr-2">📝</span>
                    New Quiz
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <span className="mr-2">📊</span>
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <span className="mr-2">🏠</span>
                    Back Home
                  </Button>
                </Link>
              </div>

              {/* Encouragement for next steps */}
              {percentage >= 70 && (
                <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 max-w-md mx-auto">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-bold mb-1">Ready for More?</h4>
                    <p className="text-white/90 text-sm">
                      Try another geography topic to earn more badges!
                    </p>
                  </CardContent>
                </Card>
              )}
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
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question →" : "Show Final Results 🎉"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
