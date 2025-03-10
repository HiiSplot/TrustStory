import React from 'react'
import './title.css'

type TitleProps = {
  title: string
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className='title-container'>
      <h1>{title}</h1>
    </div>
  )
}