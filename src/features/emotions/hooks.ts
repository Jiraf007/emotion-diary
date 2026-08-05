import { useQuery } from '@tanstack/react-query'

import { getEmotions } from './api'

export const useEmotions = () => {
  return useQuery({
    queryKey: ['emotions'],
    queryFn: getEmotions,
  })
}