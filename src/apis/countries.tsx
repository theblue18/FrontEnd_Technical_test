import type { APIResponse } from "../types/api.types"
import type { Country } from "../types/common.types"
import dataCountries  from "./countries.json"

/**
 * Fetches all countries
 *
 * @async
 * @function getAllCountriesApi
 * @returns {APIResponse} - The response object containing success status and data or error message.
 */
export function getAllCountriesApi(): APIResponse {
  return {
    success: true,
    data: dataCountries.countries as Country[],
  } as APIResponse
 
}
