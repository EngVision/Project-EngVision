interface HighlighterProps {
  text: string
  match: string
  className?: string
}

export const Highlighter = ({ text, match, className }: HighlighterProps) => {
  if (!match || !text) return text
  const regex = new RegExp(`(${match}+)`, 'gi')
  const parts = text.split(regex)
  return parts.map((part) =>
    regex.test(part) ? <mark className={className}>{part}</mark> : part,
  )
}
