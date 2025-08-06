"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, BookOpen, BarChart3, Settings, Search, Plus } from 'lucide-react'
import Link from "next/link"

export default function TeacherPortal() {
  const [selectedClass, setSelectedClass] = useState("6th-grade-a")

  const classes = [
    { id: "6th-grade-a", name: "6th Grade A", students: 24, avgScore: 82 },
    { id: "6th-grade-b", name: "6th Grade B", students: 22, avgScore: 78 },
    { id: "6th-grade-c", name: "6th Grade C", students: 26, avgScore: 85 }
  ]

  const students = [
    { name: "Emma Johnson", quizzes: 15, avgScore: 92, lastActive: "Today", streak: 5 },
    { name: "Liam Smith", quizzes: 12, avgScore: 78, lastActive: "Yesterday", streak: 3 },
    { name: "Sophia Davis", quizzes: 18, avgScore: 88, lastActive: "Today", streak: 7 },
    { name: "Noah Wilson", quizzes: 10, avgScore: 65, lastActive: "2 days ago", streak: 1 },
    { name: "Olivia Brown", quizzes: 16, avgScore: 95, lastActive: "Today", streak: 8 }
  ]

  const assignments = [
    { title: "Continents Quiz", assigned: "2024-01-15", due: "2024-01-22", completed: 18, total: 24 },
    { title: "Capital Cities Challenge", assigned: "2024-01-10", due: "2024-01-17", completed: 24, total: 24 },
    { title: "Rivers & Lakes", assigned: "2024-01-08", due: "2024-01-15", completed: 22, total: 24 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="bg-white/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to GeoQuest
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Teacher Portal</h1>
          <Button className="bg-white/20 hover:bg-white/30 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Ms. Rodriguez! 👩‍🏫</h2>
                <p className="text-gray-600">Manage your classes and track student progress</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">72</div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">82%</div>
                  <div className="text-sm text-gray-600">Avg Class Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/90 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Class Selection */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <Card 
                      key={cls.id}
                      className={`cursor-pointer transition-all ${
                        selectedClass === cls.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedClass(cls.id)}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{cls.name}</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{cls.students} students</span>
                          <span>{cls.avgScore}% avg</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-gray-600">Quizzes Completed</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">82%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">68</div>
                  <div className="text-sm text-gray-600">Active Students</div>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 text-orange-500 mx-auto mb-2 text-2xl">🏆</div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Student Progress</CardTitle>
                  <div className="flex gap-2">
                    <Input placeholder="Search students..." className="w-64" />
                    <Button size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-600">
                            {student.quizzes} quizzes • Last active: {student.lastActive}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={student.avgScore >= 80 ? "default" : student.avgScore >= 60 ? "secondary" : "destructive"}>
                          {student.avgScore}% avg
                        </Badge>
                        <Badge variant="outline">
                          🔥 {student.streak} day streak
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assignments</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold">{assignment.title}</h3>
                            <p className="text-sm text-gray-600">
                              Assigned: {assignment.assigned} • Due: {assignment.due}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {assignment.completed}/{assignment.total}
                            </div>
                            <div className="text-sm text-gray-600">Completed</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Class Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-500">
                    Detailed analytics and reporting features will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
