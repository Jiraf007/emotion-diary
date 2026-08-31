import { Box, Heading } from '@chakra-ui/react'

import { EntryForm } from '@/widgets/EntryForm'

export const CreateEntryPage = () => {
  return (
    <Box maxW="700px" mx="auto" p={3}>
      <Heading size="2xl" mb={6} mt={3}>
        Новая запись
      </Heading>

      <EntryForm />
    </Box>
  )
}