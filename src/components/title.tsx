type TitleProps = {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div style={{ height: '10vh', top: 0 }}>
      <h1>{title}</h1>
    </div>
  )
}