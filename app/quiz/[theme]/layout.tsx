// Generate static params for all quiz themes
export async function generateStaticParams() {
  const themes = ['continents', 'capitals']
  return themes.map((theme) => ({
    theme: theme,
  }))
}

export default function QuizThemeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}