import { Badge, Table } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

import type { Entry } from '@/features/entries/types'

interface DiaryTableProps {
  entries: Entry[]
}

export const DiaryTable = ({ entries }: DiaryTableProps) => {
  return (
    <Table.Root size="md">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Дата</Table.ColumnHeader>
          <Table.ColumnHeader>Событие</Table.ColumnHeader>
          <Table.ColumnHeader>Мысли</Table.ColumnHeader>
          <Table.ColumnHeader>Эмоции</Table.ColumnHeader>
          <Table.ColumnHeader>Действия</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {entries.map((entry) => (
          <Table.Row key={entry.id}>
            <Table.Cell>{format(parseISO(entry.event_date), 'dd.MM.yyyy HH:mm')}</Table.Cell>
            <Table.Cell>{entry.event}</Table.Cell>
            <Table.Cell>{entry.thoughts || '—'}</Table.Cell>
            <Table.Cell>
              {entry.entry_emotions?.map((emotion) =>
                <Badge key={emotion.emotion_id} m={1}>{emotion.emotions.emoji} {emotion.emotions.name} {emotion.intensity}</Badge>
              )}
            </Table.Cell>
            <Table.Cell>{entry.actions || '—'}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
