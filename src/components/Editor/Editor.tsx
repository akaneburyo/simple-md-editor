import type { VFC } from 'react'
import { useState, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'

// UI
import { HStack, Box, StackDivider } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

// yjs
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// Editor
import { EditorContent, useEditor } from '@tiptap/react'
import type { EditorEvents } from '@tiptap/react'
import DocumentExtension from '@tiptap/extension-document'
import TextExtension from '@tiptap/extension-text'
import CodeBlockLowlightExtension, {
  CodeBlockLowlightOptions,
} from '@tiptap/extension-code-block-lowlight'
import Collaboration from '@tiptap/extension-collaboration'
import lowlight from 'lowlight'
import 'highlight.js/styles/ascetic.css'
import '@/components/Editor/styles.css'

// Preview
import PreviewContent from '@uiw/react-markdown-preview'

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

type Params = {
  documentId: string
}

export const Editor: VFC = () => {
  const params = useParams<Params>()

  const _ = useMemo(() => {
    if (params.documentId) return new WebsocketProvider(`${WS.HOST}`, params.documentId, doc)
  }, [params.documentId])

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

  const pageTitle = useMemo(() => {
    return mdBody?.match(/^# .*/)?.pop()?.replace('# ', '') || 'untitled'
  }, [mdBody])

  return (
    <Box>
      <Helmet>
        <title>{`${pageTitle}: Markdown Editor`}</title>
      </Helmet>

      <HStack
        w="100vw"
        spacing={0}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Box p={2} w="100%">
          <EditorContent editor={editor} />
        </Box>
        <Box p={2} w="100%">
          <PreviewContent source={mdBody} />
        </Box>
      </HStack>
    </Box>
  )
}
