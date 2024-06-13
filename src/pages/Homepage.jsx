//COMPONENTS
import Hero from '../components/Hero'
import PopularMovies from '../redux/movies/PopularMovies'

const Homepage = ( {currentUser}) => {
  return (
    <main className='pb-10'>
      <Hero/>
      <PopularMovies />
    </main>
  )
}

export default Homepage