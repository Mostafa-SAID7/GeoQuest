"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, BookOpen, Trophy, Users, Star, Map, Mountain, Waves } from 'lucide-react'
import Link from "next/link"
import { InteractiveGlobe } from "@/components/interactive-globe"

export default function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const themes = [
    {
      id: "continents",
      title: "Continents",
      icon: Globe,
      color: "bg-blue-500",
      description: "Explore the 7 continents of our world!",
      quizCount: 15
    },
    {
      id: "capitals",
      title: "Capital Cities",
      icon: Star,
      color: "bg-green-500",
      description: "Test your knowledge of world capitals!",
      quizCount: 25
    },
    {
      id: "rivers",
      title: "Rivers & Lakes",
      icon: Waves,
      color: "bg-cyan-500",
      description: "Discover amazing waterways around the globe!",
      quizCount: 20
    },
    {
      id: "mountains",
      title: "Mountains",
      icon: Mountain,
      color: "bg-orange-500",
      description: "Learn about the world's highest peaks!",
      quizCount: 18
    }
  ]

  const userStats = {
    level: 5,
    totalPoints: 1250,
    badgesEarned: 8,
    quizzesCompleted: 23
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GeoQuest
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                Level {userStats.level}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {userStats.totalPoints} Points
              </Badge>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <Trophy className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D Globe Section */}
          <div className="order-2 lg:order-1">
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                  Explore Our World! 🌍
                </h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <InteractiveGlobe />
                </div>
                <p className="text-center text-gray-600 mt-4 text-sm">
                  Click and drag to rotate • Scroll to zoom • Click countries to learn more!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Themes Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Choose Your Adventure! 🚀
              </h2>
              <p className="text-white/90 text-lg">
                Pick a theme and start your geography journey
              </p>
            </div>

            <div className="grid gap-4">
              {themes.map((theme) => {
                const IconComponent = theme.icon
                return (
                  <Card 
                    key={theme.id}
                    className="bg-white/95 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${theme.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {theme.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {theme.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {theme.quizCount} Questions
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Beginner Friendly
                            </Badge>
                          </div>
                        </div>
                        <Link href={`/quiz/${theme.id}`}>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            Start Quiz
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Quick Stats */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Your Progress
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.quizzesCompleted}</div>
                    <div className="text-sm text-gray-600">Quizzes Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.badgesEarned}</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Portal Link */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Teachers & Parents</h3>
                    <p className="text-white/90 text-sm">Track progress and assign quizzes</p>
                  </div>
                  <Link href="/teacher">
                    <Button variant="secondary" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Teacher Portal
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
