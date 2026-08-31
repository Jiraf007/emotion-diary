import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { createEntry, deleteEntry, getEntries } from './api'

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

export const useDeleteEntry = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEntry,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['entries'],
      })
    },
  })
}