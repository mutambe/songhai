import {
  GitCompare,
  Wallet,
  MapPin,
  Route,
  Stethoscope,
  Sparkles,
  MessageCircle,
  Calculator,
  Smartphone,
  LayoutDashboard,
  Store,
  TrendingUp,
} from 'lucide-react'

const POST_ICONS = {
  'git-compare': GitCompare,
  wallet: Wallet,
  'map-pin': MapPin,
  route: Route,
  stethoscope: Stethoscope,
  'message-circle': MessageCircle,
  calculator: Calculator,
  smartphone: Smartphone,
  'layout-dashboard': LayoutDashboard,
  store: Store,
  'trending-up': TrendingUp,
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
