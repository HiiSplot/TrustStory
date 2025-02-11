type Card = {
  title: string
  date: string
  author: string
  description: string
}

export const Card: React.FC<Card> = ({ title, date, author, description }) => {
  return(
    <div className='card-container'>
      <h2 className='card-container__title'>{title}</h2>
      <p className='card-container__date'>{date}</p>
      <p className='card-container__author'>{author}</p>
      <p className='card-container__description'>{description}</p>
    </div>
  )
}