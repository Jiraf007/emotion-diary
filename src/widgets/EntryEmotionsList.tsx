import { Box, CheckboxCard, Collapsible, Flex, Heading, Slider, Stack } from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'

import type { CreateEntryFormData } from '@/features/entries/types'
import { useEmotions } from '@/features/emotions/hooks'
import type { Emotion } from '@/features/emotions/types'

const DEFAULT_EMOTION_INTENSITY = 10
const MIN_EMOTION_INTENSITY = 1
const MAX_EMOTION_INTENSITY = 10

type EntryEmotion = CreateEntryFormData['emotions'][number]

interface EntryEmotionsListProps {
  value: EntryEmotion[]
  onChange: (value: EntryEmotion[]) => void
}

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

export const EntryEmotionsList = ({
  value,
  onChange,
}: EntryEmotionsListProps) => {
  const {
    data: emotions,
    // isError: isEmotionsError,
    // isLoading: isEmotionsLoading,
  } = useEmotions()

  const emotionsByCategory = getEmotionsByCategory(emotions)
  const selectedEmotionIds = new Set(value.map((emotion) => emotion.emotionId))

  const handleEmotionCheckedChange = (emotionId: string, checked: boolean) => {
    if (checked) {
      onChange([...value, { emotionId, intensity: DEFAULT_EMOTION_INTENSITY }])
      return
    }

    onChange(value.filter((emotion) => emotion.emotionId !== emotionId))
  }

  const handleEmotionIntensityChange = (emotionId: string, intensity: number) => {
    onChange(
      value.map((emotion) => (
        emotion.emotionId === emotionId
          ? { ...emotion, intensity }
          : emotion
      )),
    )
  }

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
          _open={{ transform: 'rotate(90deg)' }}
        >
          <LuChevronRight />
        </Collapsible.Indicator>
        Выбери эмоции
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
                {category.emotions.map((emotion) => {
                  const emotionId = String(emotion.id)
                  const selectedEmotion = value.find((item) => item.emotionId === emotionId)

                  return (
                    <Box
                      key={emotion.id}
                      display="flex"
                      gap="4"
                      alignItems="center"
                    >
                      <CheckboxCard.Root
                        flex="1"
                        variant="surface"
                        size="sm"
                        colorPalette="teal"
                        checked={selectedEmotionIds.has(emotionId)}
                        onCheckedChange={(details) => {
                          handleEmotionCheckedChange(emotionId, details.checked === true)
                        }}
                      >
                        <CheckboxCard.HiddenInput />
                        <CheckboxCard.Control>
                          <CheckboxCard.Label>
                            {emotion.emoji} {emotion.name}
                          </CheckboxCard.Label>
                        </CheckboxCard.Control>
                      </CheckboxCard.Root>

                      {selectedEmotion && (
                        <Box
                          minW="200px"
                          display="flex"
                          gap="3"
                          alignItems="center"
                        >
                          <Slider.Root
                            size="sm"
                            flex="1"
                            min={MIN_EMOTION_INTENSITY}
                            max={MAX_EMOTION_INTENSITY}
                            step={1}
                            // value={[selectedEmotion.intensity]}
                            defaultValue={[selectedEmotion.intensity]}
                            onValueChangeEnd={(details) => {
                              handleEmotionIntensityChange(emotionId, details.value[0])
                            }}
                          >
                            <Flex gap={3}>
                            <Slider.Control>
                              <Slider.Track>
                                <Slider.Range />
                              </Slider.Track>
                              <Slider.Thumb index={0} />
                            </Slider.Control>
                          <Slider.ValueText />
                          </Flex>

                          </Slider.Root>

                        </Box>
                      )}
                    </Box>
                  )
                })}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
