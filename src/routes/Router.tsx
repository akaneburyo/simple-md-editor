import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
        <Route index element={<Editor />} />
        <Route path={Path.editor} element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
