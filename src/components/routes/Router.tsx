import type { VFC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Top } from '@/components/pages/Top'

export const Path = {
  index: '/',
} as const

const Router: VFC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Top />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
