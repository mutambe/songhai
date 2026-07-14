import {
  Users,
  Calculator,
  FileText,
  Container,
  Route,
  Database,
  Link2,
  type LucideIcon,
} from 'lucide-react'

export const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  calculator: Calculator,
  file: FileText,
  container: Container,
  route: Route,
  database: Database,
  link: Link2,
}

export function getIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? Link2
}
