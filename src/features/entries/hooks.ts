import { useQuery, useMutation } from '@tanstack/react-query'

import { createEntry, getEntries } from './api'

export const useEntries = () => {
  return useQuery({
    queryKey: ['entries'],
    queryFn: getEntries,
  })
}

export const useCreateEntry = () => {
  return useMutation({
    mutationFn: createEntry,
  })
}