import { supabase } from '@/lib/supabase'
import type { CreateEntryFormData, EntryWithEmotions } from './types'

// СОЗДАНИЕ НОВОЙ ЗАПИСИ 
export const createEntry = async (
  data: CreateEntryFormData,
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    throw new Error('Пользователь не авторизован')
  }

  const { data: entry, error: entryError } = await supabase
    .from('entries')
    .insert({
      user_id: user.id,
      event: data.event,
      thoughts: data.thoughts,
      actions: data.actions,
      event_date: data.happenedAt.toISOString(),
    })
    .select()
    .single()

  if (entryError) {
    throw entryError
  }

  if (data.emotions.length > 0) {
    const { error: emotionsError } = await supabase
      .from('entry_emotions')
      .insert(
        data.emotions.map((emotion) => ({
          entry_id: entry.id,
          emotion_id: emotion.emotionId,
          intensity: emotion.intensity,
        })),
      )

    if (emotionsError) {
      throw emotionsError
    }
  }

  return entry
}

// ПОЛУЧЕНИЕ СПИСКА ЗАПИСЕЙ
export const getEntries = async (): Promise<EntryWithEmotions[]> => {
  const { data, error } = await supabase
    .from('entries')
    .select(`
      *,
      entry_emotions (
        emotion_id,
        intensity,
        emotions (
          id,
          name,
          emoji,
          category
        )
      )
    `)
    .order('event_date', { ascending: false })

  if (error) {
    throw error
  }

  return data
}
