import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-9 w-28 bg-white/20" />
          <Skeleton className="h-6 w-32 bg-white/20" />
        </div>

        {/* Progress Bar Skeleton */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-2 w-full" />
          </CardContent>
        </Card>

        {/* Question Card Skeleton */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Answer Options Skeleton */}
            <div className="grid gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
            
            {/* Button Skeleton */}
            <div className="flex justify-end pt-4">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
