import "./App.css"
import MainLayout from "./layout/MainLayout"
import { Routes, Route } from "react-router-dom"
import Home from "./views/Home/Home"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./stores/hooks"
import { message } from "antd"
import { getCountries, setCountries } from "./reducers/countrySlice"
import NoMatch from "./views/NoMatch/NoMatch"
import { getAllCountries } from "./actions/countries"
import type { Country } from "./types/common.types"

/**
 * App Component
 * Main application component handling routing and initial data fetching.
 *
 * @component
 * @returns {JSX.Element} - The rendered App component
 */
const App = () => {
  const dispatch = useAppDispatch()
  const countries = useAppSelector(getCountries)
  
  /**
   * Fetches initial data for the application.
   * If categories data is not available, it fetches it from the API and updates the store.
   * Shows an error message if fetching fails.
   */
  useEffect(() => {
    const callGetInitData = async () => {
      const data = await getAllCountries()
      if (!data.success) {
        message.error(data.message)
        return
      }
      dispatch(setCountries(data.data as Country[]))
    }

    if (countries === undefined) {
      callGetInitData()
    }
  }, [countries, dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}



export default App
