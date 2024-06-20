//COMPONENTS
import Hero from '../components/Hero'
import PopularMovies from '../features/movies/PopularMovies'

const Homepage = () => {
  return (
    <main className='pb-10'>
      <Hero/>
      <PopularMovies />
    </main>
  )
}

export default Homepage