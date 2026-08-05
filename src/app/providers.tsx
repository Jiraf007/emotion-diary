import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from "next-themes"
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/queryClient'
import { AuthProvider } from '@/providers/AuthProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}