import type { VFC } from 'react'
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// UI
import { Container, Center, Heading, VStack, HStack, useToast } from '@chakra-ui/react'
import { Input, Button } from '@chakra-ui/react'

// Route
import { Path, PathParams } from '@/routes/Router'

export const Top: VFC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const idInputRef = useRef<HTMLInputElement>(null)
  const navigateTo = useCallback(
    (documentId) => {
      navigate(Path.editor.replace(PathParams.documentId, documentId))
    },
    [navigate]
  )

  const createNew = useCallback(() => {
    navigateTo((Math.random() + 1).toString(32).substring(2))
  }, [])

  const joinTo = useCallback(() => {
    if (idInputRef.current && idInputRef.current.value) {
      navigateTo(idInputRef.current.value)
    } else {
      toast({ description: 'Please enter document ID.', variant: 'subtle', status: 'error' })
    }
  }, [])

  return (
    <Container h="100vh">
      <Center h="100%">
        <VStack>
          <Heading mb={10}>md-editor.ryo-ya.de</Heading>

          <HStack>
            <Input ref={idInputRef} placeholder="Document ID" />
            <Button onClick={joinTo}>Join</Button>
          </HStack>

          <Button variant="outline" onClick={createNew}>
            Create New
          </Button>
        </VStack>
      </Center>
    </Container>
  )
}
