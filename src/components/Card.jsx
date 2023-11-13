import React from 'react'
import "../card.css"
const Card = ({title,img,des,readm}) => {
  return (
    <div className='card'>
      <h4>Title:{title}</h4>
      <img src={img} alt="img" />
      <h4>Description:{des}</h4>
      <a className='link' href={readm} target="_blank">readmore</a>
    </div>
  )
}

export default Card
