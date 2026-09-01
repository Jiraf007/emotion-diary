import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/providers/useAuth'

import { createEntry, deleteEntry, getEntries } from './api'

export const useEntries = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['entries', user?.id],
    queryFn: getEntries,
    enabled: Boolean(user),
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
