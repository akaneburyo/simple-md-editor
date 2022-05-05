import type { VFC } from 'react'
import { useEffect } from 'react'

// UI
import { Container } from '@chakra-ui/react'

// yjs
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// TipTap
import { useEditor, EditorContent } from '@tiptap/react'
import TipTapDocumentExtension from '@tiptap/extension-document'
import TipTapTextExtension from '@tiptap/extension-text'
import TipTapParagraphExtension from '@tiptap/extension-paragraph'

import Collaboration from '@tiptap/extension-collaboration'

// Styles
import '@/components/pages/Top/styles.css'

// Highlight
import Highlight from 'react-highlight.js'
import 'highlight.js/styles/github.css'

import { Extension } from '@tiptap/core'

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:3001', 'editor', doc)

wsProvider.on('status', (event: { status: any }) => {
  console.log(event.status)
})

const HighlightExtension = Extension.create({})

export const Top: VFC = () => {
  const editor = useEditor({
    extensions: [
      TipTapDocumentExtension,
      TipTapTextExtension,
      TipTapParagraphExtension,
      HighlightExtension,
      Collaboration.configure({ document: doc }),
    ],
    editorProps: {
      attributes: {
        id: 'editor',
      },
    },
  })

  useEffect(() => {
    console.log(editor?.getText())
  }, [editor])

  return (
    <Container maxW="container.2xl">
      <EditorContent editor={editor} />
    </Container>
  )
}
