type TitleProps = {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div style={{ height: '10vh' }}>
      <h1>{title}</h1>
    </div>
  )
}