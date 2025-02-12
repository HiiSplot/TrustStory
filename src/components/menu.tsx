import {Button, Menu, MenuTrigger, Popover} from 'react-aria-components';
import { ReactNode } from 'react';

type CustomMenuProps = {
  title: string
  children: ReactNode
}

export const CustomMenu: React.FC<CustomMenuProps> = ({ title, children }) => {
  return(
  <MenuTrigger>
    <Button aria-label="Menu">{title}</Button>
    <Popover>
      <Menu>
        {children}
      </Menu>
    </Popover>
  </MenuTrigger>
  )
}