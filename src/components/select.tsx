import { useState } from "react"
import { Categories } from "../pages/Stories"
import './select.css'

type MySelectProps = {
  items: Categories[]
  name: string
  onSelect: (item: Categories) => void
}

export const MySelect: React.FC<MySelectProps> = ({ items, name, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<Categories | null>(null);

  const handleSelect = (item: Categories) => {
    setSelectedItem(item);
    onSelect(item);
  }

  return (
    <>
      <label htmlFor={name}>Catégories</label>
      <select className='select' name={name} onChange={(e) => handleSelect(items[parseInt(e.target.value)])}>
        {items.map((item, index) => (
          <option key={index} value={index}>{item.category_name}</option>
        ))}
      </select>
    </>
  )
}