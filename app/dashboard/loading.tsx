import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-9 w-28 bg-white/20" />
          <Skeleton className="h-8 w-40 bg-white/20" />
          <div></div>
        </div>

        {/* Welcome Section Skeleton */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Overview Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats Skeleton */}
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-4 text-center space-y-2">
                    <Skeleton className="h-8 w-8 mx-auto" />
                    <Skeleton className="h-8 w-12 mx-auto" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Level Progress Skeleton */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-4 w-48" />
              </CardContent>
            </Card>

            {/* Recent Activity Skeleton */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div className="text-right space-y-1">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Badges Section Skeleton */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-3 bg-gray-100 rounded-lg text-center space-y-2">
                      <Skeleton className="h-8 w-8 mx-auto" />
                      <Skeleton className="h-4 w-16 mx-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Motivational Card Skeleton */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <Skeleton className="h-12 w-12 mx-auto" />
                <Skeleton className="h-6 w-24 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
                <Skeleton className="h-9 w-24 mx-auto" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
