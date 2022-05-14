import type { VFC } from 'react'
import { useState, useCallback, useRef, useMemo } from 'react'

// UI
import { HStack, Box, StackDivider } from '@chakra-ui/react'

// yjs
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// Editor
import { EditorContent as Editor, useEditor } from '@tiptap/react'
import type { PureEditorContent, EditorEvents } from '@tiptap/react'
import DocumentExtension from '@tiptap/extension-document'
import TextExtension from '@tiptap/extension-text'
import CodeBlockLowlightExtension, {
  CodeBlockLowlightOptions,
} from '@tiptap/extension-code-block-lowlight'
import Collaboration from '@tiptap/extension-collaboration'
import lowlight from 'lowlight'
import 'highlight.js/styles/ascetic.css'

import '@/components/pages/Top/styles.css'

// Preview
import Preview from '@uiw/react-markdown-preview'

// Constants
import { WS } from '@/constants/config'

const mdBodyIdentifier = 'md_body'

const CustomCodeBlockExtension = CodeBlockLowlightExtension.extend<CodeBlockLowlightOptions>({
  content: 'text*',
  code: true,
  addOptions: () => ({
    languageClassPrefix: 'language-',
    exitOnTripleEnter: false,
    exitOnArrowDown: false,
    HTMLAttributes: { id: mdBodyIdentifier },
    lowlight,
    defaultLanguage: null,
  }),
  addCommands: () => ({}),
})

const doc = new Y.Doc()

export const Top: VFC = () => {
  // TODO
  const id = 'doc_id'

  const _ = useMemo(() => new WebsocketProvider(`${WS.HOST}`, id, doc), [id])
  const editorRef = useRef<PureEditorContent>(null)

  const [mdBody, setMdBody] = useState<string>()
  const onUpdate = useCallback((props: EditorEvents['update']) => {
    setMdBody(props.editor?.getText())
  }, [])

  const editor = useEditor(
    {
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
      onUpdate,
    },
    []
  )

  return (
    <HStack
      h="100vh"
      w="100vw"
      spacing={0}
      align="stretch"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Box p={2} w="100%">
        <Editor editor={editor} ref={editorRef} />
      </Box>
      <Box p={2} w="100%">
        <Preview source={mdBody} />
      </Box>
    </HStack>
  )
}
