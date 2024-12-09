import {
  getAllProductsApi,
} from "../apis/products"

/**
 * Fetches all products by calling the API and returns the result.
 *
 * @returns {Promise<APIResponse>} - A promise resolving to the API response containing all products data.
 */
export async function getAllProducts() {
  let result = await getAllProductsApi()
  return result
}

