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
}