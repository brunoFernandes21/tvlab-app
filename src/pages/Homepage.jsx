import React from 'react'
import Hero from '../components/Hero'
import PopularMovies from '../redux/movies/PopularMovies'

const Homepage = () => {
  return (
    <main className='pb-10'>
      <Hero/>
      <PopularMovies/>
    </main>
  )
}

export default Homepage