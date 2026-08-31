import { Button, Field, Input, Stack, Textarea } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useCreateEntry } from '@/features/entries/hooks'
import type { CreateEntryFormData } from '@/features/entries/types'
import { EntryEmotionsList } from '../EntryEmotionsList'

const DATE_TIME_INPUT_FORMAT = "yyyy-MM-dd'T'HH:mm"

const parseDateTimeLocalValue = (value: unknown) => {
  if (value instanceof Date) {
    return value
  }

  if (typeof value !== 'string' || value === '') {
    return undefined
  }

  return parseISO(value)
}

export const EntryForm = () => {
  const happenedAt = useMemo(() => new Date(), [])
  const createEntry = useCreateEntry()


  const {
    control,
    register,
    handleSubmit,
  } = useForm<CreateEntryFormData>({
    defaultValues: {
      happenedAt,
      event: '',
      thoughts: '',
      actions: '',
      emotions: []
    },
  })

  const onSubmit = (data: CreateEntryFormData) => {
    console.log(data)
    createEntry.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={6}>

        {/*ДАТА И ВРЕМЯ */}
        <Field.Root required>
          <Field.Label>
            Дата и время
            <Field.RequiredIndicator />
          </Field.Label>

          <Controller
            control={control}
            name="happenedAt"
            render={({ field }) => (
              <Input
                name={field.name}
                ref={field.ref}
                type="datetime-local"
                value={format(field.value, DATE_TIME_INPUT_FORMAT)}
                onBlur={field.onBlur}
                onChange={(event) => {
                  field.onChange(parseDateTimeLocalValue(event.target.value))
                }}
              />
            )}
          />
        </Field.Root>

        {/* СОБЫТИЕ */}
        <Field.Root>
          <Field.Label>
            Событие
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder="Что произошло?"
            {...register('event')}
          />
        </Field.Root>

        {/* МЫСЛИ */}
        <Field.Root>
          <Field.Label>
            Мысли
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder="Какие мысли появились?"
            {...register('thoughts')}
          />
        </Field.Root>

        {/* ЭМОЦИИ */}
        {/* <Field.Root invalid={isEmotionsError}>
          <Field.Label>
            Эмоции
            <Field.RequiredIndicator />
          </Field.Label>

          <NativeSelect.Root>
            <NativeSelect.Field
              disabled={isEmotionsLoading || isEmotionsError}
              placeholder={isEmotionsLoading ? 'Загрузка...' : 'Выбери эмоции и их интенсивность'}
              {...register('emotionId', {
                required: true,
              })}
            >
              {emotions?.map((emotion) => (
                <option
                  key={emotion.id}
                  value={emotion.id}
                >
                  {emotion.emoji} {emotion.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>

          {isEmotionsError && (
            <Field.ErrorText>
              Не удалось загрузить эмоции
            </Field.ErrorText>
          )}
        </Field.Root> */}

        <Controller
          control={control}
          name="emotions"
          render={({ field }) => (
            <EntryEmotionsList
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* ДЕЙСТВИЯ */}
        <Field.Root>
          <Field.Label>
            Действия
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            placeholder="Что ты сделал?"
            {...register('actions')}
          />
        </Field.Root>

        <Button
          type="submit"
          loading={createEntry.isPending}
        >
          Сохранить
        </Button>

      </Stack>
    </form>
  )
}
