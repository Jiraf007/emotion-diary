import { Table } from "@chakra-ui/react"


export const DiaryTable = () => {
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
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.event}</Table.Cell>
            <Table.Cell>{item.thoughts}</Table.Cell>
            <Table.Cell>{item.emotions}</Table.Cell>
            <Table.Cell>{item.actions}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const items = [
  {
    id: 1,
    date: "2023-10-01",
    event: "Пришёл отказ от потенциального работодателя",
    thoughts: "Я ни на что не способен. У меня всё равно ничего не получится",
    emotions: "Гнев, паника, тревога, злость",
    actions: "Заварил чай. Пошел мониторить новые вакансии"
  },
]
