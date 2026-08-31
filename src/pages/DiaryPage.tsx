import { Box, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useEntries } from '@/features/entries/hooks'
import { DiaryTable } from '@/widgets/DiaryTable'

export const DiaryPage = () => {
  const {
    data: entries = [],
    isError,
    isLoading,
  } = useEntries()

  if (isLoading) {
    return (
      <Box p="4">
        <Text>Загрузка...</Text>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box p="4">
        <Text>Не удалось загрузить записи</Text>
      </Box>
    )
  }

  return (
    <Box p="4">
      <Button
        asChild
        mb="4"
      >
        <Link to="/entries/new">
          Добавить запись
        </Link>
      </Button>

      <DiaryTable entries={entries} />
    </Box>
  )
}
