import type { VFC } from 'react'
import { useEffect } from 'react'

// UI
import { Container } from '@chakra-ui/react'

// yjs
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// Editor
import { useEditor, EditorContent } from '@tiptap/react'
import DocumentExtension from '@tiptap/extension-document'
import TextExtension from '@tiptap/extension-text'
import CodeBlockLowlightExtension, {
  CodeBlockLowlightOptions,
} from '@tiptap/extension-code-block-lowlight'
import Collaboration from '@tiptap/extension-collaboration'
import lowlight from 'lowlight'
import 'highlight.js/styles/ascetic.css'

import '@/components/pages/Top/styles.css'

// Constants
import { WS } from '@/constants/config'

const CustomCodeBlockExtension = CodeBlockLowlightExtension.extend<CodeBlockLowlightOptions>({
  content: 'text*',
  code: true,
  addOptions: () => ({
    languageClassPrefix: 'language-',
    exitOnTripleEnter: false,
    exitOnArrowDown: false,
    HTMLAttributes: {},
    lowlight,
    defaultLanguage: null,
  }),
  addCommands: () => ({}),
})

const doc = new Y.Doc()
const wsProvider = new WebsocketProvider(`${WS.HOST}`, 'editor', doc)

export const Top: VFC = () => {
  const editor = useEditor({
    extensions: [
      DocumentExtension,
      TextExtension,
      CustomCodeBlockExtension.configure({
        defaultLanguage: 'markdown',
        lowlight,
      }),
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
