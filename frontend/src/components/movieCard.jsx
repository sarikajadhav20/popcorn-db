import React from 'react'

function movieCard({_id, title, description, images, category, director, year, language, rating}) {
  return (
    <div className='m-4 shadow-lg w-[300px] bg-pink-200 p-4 rounded-lg relative hover:scale-105 transform transition duration-100 '>
      <h2 className='text-white font-bold text-4xl text-center'>{title}</h2>
      <p className='font-bold'>{description}</p>
      <p>Category: {category}</p>
      <p>Director: {director}</p>
      <p>Year: {year}</p>
      <p>Language: {language}</p>
      <p>Rating: {rating}★</p>
    </div>
  )
}

export default movieCard
