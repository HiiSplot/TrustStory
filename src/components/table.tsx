import React from "react"
import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components"
import { Story } from "../pages/Stories"
import { postInFavorites } from "../api/api"
import './table.css'

type MyTableProps = {
  items: Story[]
  setIsStoryOpened: React.Dispatch<React.SetStateAction<boolean>>
  setStoryId: React.Dispatch<React.SetStateAction<number>>
}

export const MyTable: React.FC<MyTableProps> = ({ items, setIsStoryOpened, setStoryId }) => {
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)

  const favoriteToggle = (storyId: number) => {
    setIsFavorite(!isFavorite)
    postInFavorites(storyId)
  }

  const onViewMore = (id: number) => {
    setStoryId(id)
    setIsStoryOpened(true)
  }

  return (
    <Table aria-label="Files" selectionMode="multiple" className='table'>
      <TableHeader>
        <Column className='table__column' isRowHeader>Titre</Column>
        <Column className='table__column'>Date</Column>
        <Column className='table__column'>Auteur</Column>
        <Column className='table__column'>Description</Column>
      </TableHeader>
      <TableBody items={items}>
        {items.map((item) => (
        <Row className='table__row' style={{ cursor: 'pointer' }} onAction={() => onViewMore(item.id)}>
          <Cell className='table__cell title'>{item.title}</Cell>
          <Cell className='table__cell date'>{item.date}</Cell>
          <Cell className='table__cell author'>{item.author}</Cell>
          <Cell className='table__cell description'>{item.description}</Cell>
          <Cell key={item.id} className='table__cell like'>
            <div
              className='card-container__icons-container'
              onClick={(e) => {
                e.stopPropagation()
                favoriteToggle( item.id)}
              }>
              <div id={item.id.toString()} className="icon">
                <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
              </div>
            </div>
          </Cell>
        </Row>
        ))}
      </TableBody>
    </Table>
  )
}