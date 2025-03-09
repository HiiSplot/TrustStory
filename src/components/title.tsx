type TitleProps = {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh', top: 0, margin: '10px' }}>
      <h1>{title}</h1>
    </div>
  )
}