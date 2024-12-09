import type { APIResponse } from "../types/api.types"
import dataProducts  from "./products.json"
import type { Product } from "../types/common.types"

/**
 * Fetches all products from the Fake Store API.
 *
 * @async
 * @function getAllProductsApi
 * @returns {APIResponse} - The response object containing success status and data or error message.
 */
export function getAllProductsApi(): APIResponse {
  return {
    success: true,
    data: dataProducts.products as Product[],
  } as APIResponse
 
}

