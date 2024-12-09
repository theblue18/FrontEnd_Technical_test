/**
 * Represents a product in the store.
 *
 * @property {string} name - The name of product.
 * @property {string} brand - The brand of the product.
 * @property {number} id - Unique identifier for the product.
 * @property {string} deposited_on - deposit time of the product.
 * @property {Price} price - Price of the product.
 * @property {Seller} seller - Seller details of the product.
 * @property {string[]} shippable_countries - all shippable countries of product.
 */
export type Product = {
  id: number
  name: string
  brand: string
  deposited_on: string
  price: Price
  seller: Seller
  shippable_countries: string[]
}

/**
 * Represents the price of a product.
 *
 * @property {string} currency 
 * @property {number} price_in_cents 
 * @property {string} price 
 */
export type Price = {
  currency: string
  price_in_cents: number,
  price: string,
}

/**
 * Represents the seller of a product.
 *
 * @property {string} name 
 * @property {number} id 
 * @property {string} country 
 */
export type Seller = {
  name: string
  id: number,
  country: string,
}


/**
 * Defines the range for price filtering.
 *
 * @property {number} lower - The minimum price in the filter.
 * @property {number} upper - The maximum price in the filter.
 */
export type PriceRangeFilter =  {
  lower: number, 
  upper: number
}

/**
 * Enumeration for sorting options.
 *
 * @enum {string}
 * @property {string} PriceAsc - Sort by price from low to high.
 * @property {string} PriceDesc - Sort by price from high to low.
 */
export enum SortEnum {

  PriceAsc = 'priceASC',
  PriceDesc = 'priceDES',

}

/**
 * Array of sorting options with labels for display.
 *
 * @const {Array<{value: SortEnum, label: string}>}
 */
export const sortOptions = [

  { value: SortEnum.PriceAsc, label: 'Sort by Price (low to high)' },
  { value: SortEnum.PriceDesc, label: 'Sort by Price (high to low)' },

];

/**
 * Represents the country.
 *
 * @property {string} code 
 * @property {string} name 
 */
export type Country = {
  code: string
  name: string
 
}
