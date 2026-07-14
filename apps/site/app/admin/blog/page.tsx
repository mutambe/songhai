import { listPosts } from '@/lib/blog-store'
import { getAdminSession } from '@/lib/admin-auth'
import { BlogAdminPanel } from '@/components/admin/blog-admin-panel'
import { LogoutButton } from '@/components/admin/logout-button'

export default async function BlogAdminPage() {
  const [posts, identity] = await Promise.all([listPosts(), getAdminSession()])

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-teal">
            Gestão do blog {identity && `· sessão de ${identity.name}`}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-foreground">
            Artigos
          </h1>
        </div>
        <LogoutButton />
      </div>
      <BlogAdminPanel initialPosts={posts} />
    </main>
  )
}
