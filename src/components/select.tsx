import { useState } from "react"
import { Categories } from "../pages/Stories"
import './select.css'
import { t } from "i18next"

type MySelectProps = {
  items: Categories[]
  name: string
  onSelect: (item: Categories) => void
}

export const MySelect: React.FC<MySelectProps> = ({ items, name, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<Categories | null>(null);

  const handleSelect = (item: Categories | null) => {
    if (!item) return
    setSelectedItem(item);
    onSelect(item);
  }

  return (
    <>
      <label htmlFor={name}>{t("story.form.categories")}</label>
      <select className='select' name={name} onChange={() => handleSelect(selectedItem)}>
        {items.map((item, index) => (
          <option key={index} value={index}>{item.category_name}</option>
        ))}
      </select>
    </>
  )
}