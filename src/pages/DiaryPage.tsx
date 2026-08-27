// import { useEmotions } from '@/features/emotions/hooks'
import { DiaryTable } from '@/widgets/DiaryTable'
import { Box } from '@chakra-ui/react'

export const DiaryPage = () => {
  // const {
  //   data: emotions,
  //   isLoading,
  // } = useEmotions()

  // if (isLoading) {
  //   return <div>Загрузка...</div>
  // }

  return (
    <Box p="4">

      <DiaryTable />

      {/* <ul>
        {emotions?.map((emotion) => (
          <li key={emotion.id}>
            {emotion.emoji} {emotion.name}
          </li>
        ))}
      </ul> */}
    </Box>
  )
}