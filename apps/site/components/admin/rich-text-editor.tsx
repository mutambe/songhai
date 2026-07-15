'use client'

import { useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  Heading2,
} from 'lucide-react'

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (html: string) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[160px] rounded-b-lg border border-t-0 border-line bg-sand px-4 py-3 text-foreground outline-none focus-visible:border-mint prose-headings:font-serif prose-a:text-teal',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.set('image', file)
    const res = await fetch('/api/admin/blog/upload-image', { method: 'POST', body: formData })
    const json = await res.json()
    if (!res.ok) {
      window.alert(json.error || 'Não foi possível enviar a imagem.')
      return
    }
    editor?.chain().focus().setImage({ src: json.url }).run()
  }

  if (!editor) return null

  const btnClass = (active: boolean) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
      active ? 'bg-mint/20 text-mint' : 'text-ink-soft hover:bg-paper-muted hover:text-foreground'
    }`

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-line bg-sand px-2 py-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive('heading', { level: 3 }))}
          title="Subtítulo"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive('bulletList'))}
          title="Lista"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive('orderedList'))}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL do link:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          className={btnClass(editor.isActive('link'))}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={btnClass(false)}
          title="Inserir imagem"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) uploadImage(file)
            e.target.value = ''
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
