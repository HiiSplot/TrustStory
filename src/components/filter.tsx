import { MenuItem } from "react-aria-components"
import { Categories } from "../pages/Stories"
import { CustomMenu } from "./menu"
import './filter.css'

type FilterProps = {
  title: string,
  items: Categories[]
  handleAction: (id: number) => void
}

export const Filter: React.FC<FilterProps> = ({ title, items, handleAction }) => {
  return (
    <>
      <CustomMenu title={title}>
        {items.map((item) => 
          <MenuItem
            className="menu-items"
            key={item.id}
            onAction={() => handleAction(item.id)}
          >
            {item.category_name}
          </MenuItem>
        )}
      </CustomMenu>
    </>
  )
}