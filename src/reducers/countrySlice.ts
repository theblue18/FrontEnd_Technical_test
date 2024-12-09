import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../stores/store"
import type { Country } from "../types/common.types"

/**
 * Represents the state structure for country within the application.
 * 
 * @typedef {Object} CountryState
 * @property {string[] | undefined} countries - An optional array of countries.
 */
interface CountryState {
  countries?: Country[]
}

// Define the initial state using the CountryState type
const initialState: CountryState = {
  countries: undefined,
}

/**
 * Slice for managing countries state
 * Contains actions and reducers for modifying the data slice of the state.
 */
export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    /**
     * Sets the categories in the state.
     * 
     * @param {CountryState} state - The current state of the country slice.
     * @param {PayloadAction<Country[]>} action - The action payload containing an array of countries.
     */
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload
    },
  },
})

// Exporting the setCountries action for dispatching to update the state
export const { setCountries } = countrySlice.actions

/**
 * Selector to retrieve the categories from the data state.
 * 
 * @param {RootState} state - The root state of the Redux store.
 * @returns {Country[] | undefined} - The array of country or undefined if not set.
 */
export const getCountries = (state: RootState) => state.country.countries

export default countrySlice.reducer
