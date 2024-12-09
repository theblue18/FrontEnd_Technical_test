import { getAllCountriesApi } from "../apis/countries"

/**
 * Fetches all countries.
 *
 * @returns {Promise<APIResponse>} - A promise resolving to the API response containing the list of countries.
 */
export async function getAllCountries() {
  let countryData = await getAllCountriesApi()
  return countryData
}
