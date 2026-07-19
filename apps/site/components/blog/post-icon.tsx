import { GitCompare, Wallet, MapPin, Route, Stethoscope, Sparkles } from 'lucide-react'

const POST_ICONS = {
  'git-compare': GitCompare,
  wallet: Wallet,
  'map-pin': MapPin,
  route: Route,
  stethoscope: Stethoscope,
} as const

export function PostIllustration({
  icon,
  className,
}: {
  icon?: string
  className?: string
}) {
  const Icon = (icon && POST_ICONS[icon as keyof typeof POST_ICONS]) || Sparkles
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={1.25}
      className={className}
    />
  )
}
