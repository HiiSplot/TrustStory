export type InsertResult = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
};

export type Story = {
  id: number
  title: string
  date: string
  author: string
  description: string
  categoryId: number
  userId: number
  isFavorite: boolean
}

export type Select = {
  id: number
  name: string
  isSelected?: boolean
}
