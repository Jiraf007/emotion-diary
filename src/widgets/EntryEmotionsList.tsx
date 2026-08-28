import { CheckboxCard, Collapsible, Heading, Stack } from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu"
import { useEmotions } from '@/features/emotions/hooks'
import type { Emotion } from "@/features/emotions/types"

const EMOTION_CATEGORIES = [
  {
    value: 'love',
    label: 'Любовь',
  },
  {
    value: 'joy',
    label: 'Радость',
  },
  {
    value: 'sadness',
    label: 'Грусть',
  },
  {
    value: 'fear',
    label: 'Страх',
  },
  {
    value: 'anger',
    label: 'Злость',
  },
]

const getEmotionsByCategory = (emotions: Emotion[] = []) => {
  return EMOTION_CATEGORIES.map((category) => ({
    ...category,
    emotions: emotions.filter((emotion) => emotion.category === category.value),
  }))
}

export const EntryEmotionsList = () => {
  const {
    data: emotions,
    // isError: isEmotionsError,
    // isLoading: isEmotionsLoading,
  } = useEmotions()

  const emotionsByCategory = getEmotionsByCategory(emotions)

  return (
    <Collapsible.Root defaultOpen>
      <Collapsible.Trigger
        paddingY="3"
        display="flex"
        gap="2"
        alignItems="center"
      >
        <Collapsible.Indicator
          transition="transform 0.2s"
          _open={{ transform: "rotate(90deg)" }}
        >
          <LuChevronRight />
        </Collapsible.Indicator>
        Выбери эмоции и их интенсивность
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack padding="4" borderWidth="1px">
          {emotionsByCategory.map((category) => (
            <Stack
              key={category.value}
              gap="2"
            >
              <Heading size="md">{category.label}</Heading>

              <Stack gap="1">
                {category.emotions.map((emotion) => (
                  // <div key={emotion.id}>{emotion.emoji} {emotion.name}</div>
                  <CheckboxCard.Root
                    key={emotion.id}
                    variant="surface"
                    size="sm"
                    colorPalette="teal"
                  >
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                      <CheckboxCard.Label>{emotion.emoji} {emotion.name}</CheckboxCard.Label>
                    </CheckboxCard.Control>
                  </CheckboxCard.Root>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
