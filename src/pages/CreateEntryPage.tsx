import { Box, Heading } from '@chakra-ui/react'

import { EntryForm } from '@/widgets/EntryForm'

export const CreateEntryPage = () => {
  return (
    <Box maxW="700px" mx="auto">
      <Heading mb={8}>
        Новая запись
      </Heading>

      <EntryForm />
    </Box>
  )
}