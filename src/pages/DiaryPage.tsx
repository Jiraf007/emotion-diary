import { useEmotions } from '@/features/emotions/hooks'
import { Box, Heading } from '@chakra-ui/react'

export const DiaryPage = () => {
  const {
    data: emotions,
    isLoading,
  } = useEmotions()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <Box p="4">
      <Heading>Эмоции</Heading>

      <ul>
        {emotions?.map((emotion) => (
          <li key={emotion.id}>
            {emotion.emoji} {emotion.name}
          </li>
        ))}
      </ul>
    </Box>
  )
}