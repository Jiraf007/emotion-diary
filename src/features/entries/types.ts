import type { Emotion } from '@/features/emotions/types'

export interface EntryEmotion {
  emotion_id: number
  intensity: number
  emotions: Emotion
}

export interface EntryWithEmotions extends Entry {
  emotions: EntryEmotion[]
}

export interface CreateEntryFormData {
  happenedAt: Date
  event: string
  thoughts: string
  actions: string
  emotions: {
    emotionId: string
    intensity: number
  }[]
}

export interface Entry {
  id: string
  user_id: string
  event: string
  thoughts: string | null
  actions: string | null
  event_date: string
  created_at: string
  // 
  entry_emotions: EntryEmotion[]
}
