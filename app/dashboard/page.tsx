"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Trophy, Star, Target, Calendar, Award, BookOpen } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  const userStats = {
    name: "Alex",
    level: 5,
    totalPoints: 1250,
    badgesEarned: 8,
    quizzesCompleted: 23,
    streakDays: 7,
    averageScore: 78
  }

  const badges = [
    { name: "Geography Explorer", icon: "🌍", earned: true, description: "Completed first quiz" },
    { name: "Capital Master", icon: "🏛️", earned: true, description: "Scored 100% on capitals quiz" },
    { name: "Continent Conqueror", icon: "🗺️", earned: true, description: "Mastered all continents" },
    { name: "River Runner", icon: "🏞️", earned: false, description: "Complete rivers quiz with 80%+" },
    { name: "Mountain Climber", icon: "⛰️", earned: false, description: "Ace the mountains quiz" },
    { name: "Week Warrior", icon: "🔥", earned: true, description: "7-day learning streak" }
  ]

  const recentActivity = [
    { quiz: "Continents", score: 85, date: "Today", points: 85 },
    { quiz: "Capital Cities", score: 92, date: "Yesterday", points: 92 },
    { quiz: "Rivers & Lakes", score: 76, date: "2 days ago", points: 76 },
    { quiz: "Mountains", score: 88, date: "3 days ago", points: 88 }
  ]

  const nextLevelProgress = ((userStats.totalPoints % 300) / 300) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Your Dashboard</h1>
          <div></div>
        </div>

        {/* Welcome Section */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {userStats.name}! 👋</h2>
                <p className="text-white/90">You're doing amazing! Keep up the great work.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">Level {userStats.level}</div>
                <div className="text-white/90 text-sm">Geography Explorer</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.totalPoints}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.quizzesCompleted}</div>
                  <div className="text-sm text-gray-600">Quizzes Done</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{userStats.streakDays}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Level {userStats.level}</span>
                  <span className="text-sm text-gray-600">Level {userStats.level + 1}</span>
                </div>
                <Progress value={nextLevelProgress} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">
                  {Math.round(300 - (userStats.totalPoints % 300))} points to next level
                </p>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{activity.quiz}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{activity.score}%</div>
                        <div className="text-sm text-green-600">+{activity.points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Badges ({badges.filter(b => b.earned).length}/{badges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center transition-all ${
                        badge.earned
                          ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"
                          : "bg-gray-100 border-2 border-gray-200 opacity-60"
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-medium text-gray-800">{badge.name}</div>
                      {badge.earned && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Earned!
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">Daily Goal</h3>
                <p className="text-white/90 text-sm mb-4">
                  Complete 2 more quizzes to reach your daily goal!
                </p>
                <Link href="/">
                  <Button variant="secondary" size="sm">
                    Start Quiz
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
