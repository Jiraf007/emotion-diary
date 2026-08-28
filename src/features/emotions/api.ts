import { supabase } from '@/lib/supabase'

import type { Emotion } from './types'

export const getEmotions = async (): Promise<Emotion[]> => {
  const { data, error } = await supabase
    .from('emotions')
    .select('*')
    .order('name')

  if (error) {
    throw error
  }

  return data as Emotion[]
}
