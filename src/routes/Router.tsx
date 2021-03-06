import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import { Top } from '@/components/Top'
import { Editor } from '@/components/Editor'

export const PathParams = {
  documentId: ':documentId',
}
export const Path = {
  index: '/',
  editor: `/${PathParams.documentId}`,
} as const

const Router: VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
        <Route path={Path.editor} element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
