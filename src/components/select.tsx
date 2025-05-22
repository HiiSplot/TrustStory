import { t } from "i18next"
import { Select } from "../api/types"
import './select.css'

type MySelectProps = {
  items: Select[]
  name: string
  setCategoryId: React.Dispatch<React.SetStateAction<number>>
}

export const MySelect: React.FC<MySelectProps> = ({ items, name, setCategoryId }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setCategoryId(parseInt(e.target.value));
  }

  return (
    <>
      <label htmlFor={name}>{t("story.form.categories")}</label>
      <select className='select' name={name} onChange={handleSelect}>
        {items.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
    </>
  )
}