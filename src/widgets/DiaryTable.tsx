import { Badge, Menu, Portal, Table } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

import { useDeleteEntry } from '@/features/entries/hooks'
import type { Entry } from '@/features/entries/types'

interface DiaryTableProps {
  entries: Entry[]
}

export const DiaryTable = ({ entries }: DiaryTableProps) => {
  const { mutate: deleteEntry, isPending: isDeleting } = useDeleteEntry()

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
          <Menu.Root key={entry.id}>
            <Menu.ContextTrigger asChild>
              <Table.Row cursor="context-menu">
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
            </Menu.ContextTrigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item
                    value="delete"
                    color="red.400"
                    disabled={isDeleting}
                    onClick={() => deleteEntry(entry.id)}
                  >
                    Удалить запись
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
