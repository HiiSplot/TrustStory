import { useState } from "react"
import { Select } from "../pages/Stories"
import './select.css'
import { t } from "i18next"

type MySelectProps = {
  items: Select[]
  name: string
  onSelect: (item: Select) => void
}

export const MySelect: React.FC<MySelectProps> = ({ items, name, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<Select | null>(null);

  const handleSelect = (item: Select | null) => {
    if (!item) return
    setSelectedItem(item);
    onSelect(item);
  }

  return (
    <>
      <label htmlFor={name}>{t("story.form.categories")}</label>
      <select className='select' name={name} onChange={() => handleSelect(selectedItem)}>
        {items.map((item, index) => (
          <option key={index} value={index}>{item.name}</option>
        ))}
      </select>
    </>
  )
}