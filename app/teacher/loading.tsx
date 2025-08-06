import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TeacherLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-32 bg-white/20" />
          <Skeleton className="h-8 w-48 bg-white/20" />
          <Skeleton className="h-10 w-24 bg-white/20" />
        </div>

        {/* Welcome Card Skeleton */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex gap-4">
                <div className="text-center space-y-1">
                  <Skeleton className="h-8 w-12 mx-auto" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="text-center space-y-1">
                  <Skeleton className="h-8 w-12 mx-auto" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-white/90 backdrop-blur-sm rounded-lg p-1">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Content Skeleton */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-2">
                      <Skeleton className="h-6 w-24" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Stats Grid Skeleton */}
              <div className="grid md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4 text-center space-y-2">
                      <Skeleton className="h-8 w-8 mx-auto" />
                      <Skeleton className="h-8 w-12 mx-auto" />
                      <Skeleton className="h-4 w-20 mx-auto" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
