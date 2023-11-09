import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import UserCard from './components/UserCard'
import Resident from './components/Resident'

function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 126) + 1)
  const url = `https://rickandmortyapi.com/api/location/${number}`
  const [location, getLocation, isLoading, hasError] = useFetch(url)


  useEffect(() => {
    getLocation()
  }, [number])

  const setLocation = useRef()

  const handle = e => {
    e.preventDefault()
    setNumber(setLocation.current.value.trim())

  }

  return (
    <>
      <div className='app'>
        <h1 className='app__title'>
          <img className='app__image' src="/images/banner.png" alt="" />
        </h1>
        <form className='app__form' onSubmit={handle}>
          <input className='app__input' ref={setLocation} type="text" />
          <button className='app__btn'>Search</button>
        </form>
        {
          isLoading
          ? <span className="loader"></span>
          : (
          hasError || number === "0"
            ?
            <h2>Hey! you must provide an id from 1 to 126</h2>
            : (
              <>
                <UserCard
                  location={location}
                />
                <div className='app__card-container'>
                  {
                    location?.residents.map(url => (
                      <Resident
                        key={url}
                        url={url}
                      />
                    ))
                  }
                </div>
              </>
              )
              )
        }
      </div>
    </>
  )
}

export default App
