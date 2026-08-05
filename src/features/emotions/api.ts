import { supabase } from '@/lib/supabase'

export const getEmotions = async () => {
  const { data, error } = await supabase
    .from('emotions')
    .select('*')
    .order('name')

  if (error) {
    throw error
  }

  return data
}