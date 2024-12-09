import type { PayloadAction } from "@reduxjs/toolkit"
import { createSelector, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../stores/store"
import { SortEnum } from "../types/common.types"
import type { PriceRangeFilter, Product } from "../types/common.types"

const VITE_MIN_PRICE_FILTER = Number(import.meta.env.VITE_MIN_PRICE_FILTER) || 0
const VITE_MAX_PRICE_FILTER = Number(import.meta.env.VITE_MAX_PRICE_FILTER) || 2000


const VITE_REVERSE_BRAND = (import.meta.env.VITE_REVERSE_BRAND || "Louis Vuitton")
  .split(",")
  .map((brand: string) => brand.trim()) 
  .filter(Boolean) as string[]; 

/**
 * Defines the structure of the product-related state within the application.
 *
 * @typedef {Object} ProductState
 * @property {Product[]} products - An array of all products.
 * @property {string} countryFilter - The currently applied country filter.
 * @property {PriceRangeFilter} priceRangeFilter - The selected price range filter.
 * @property {SortEnum} sortBy - The current sorting method.
 * @property {boolean} isShowFilterDrawer - Boolean to control filter drawer visibility.
 * @property {number} currentPage - The current page number.
 */
interface ProductState {
  products: Product[]
  countryFilter: string
  priceRangeFilter: PriceRangeFilter
  sortBy: SortEnum
  isShowFilterDrawer: boolean
  currentPage: number
}

// Define the initial state for the product slice
const initialState: ProductState = {
  products: [],
  countryFilter: "All",
  priceRangeFilter: {
    lower: VITE_MIN_PRICE_FILTER,
    upper: VITE_MAX_PRICE_FILTER,
  },
  sortBy: SortEnum.PriceAsc,
  isShowFilterDrawer: false,
  currentPage: 1
}

/**
 * Product slice for managing product-related state, including reducers for setting,
 * filtering, and sorting products, as well as controlling UI elements like the filter drawer.
 */
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    /**
     * Sets the entire product list.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<Product[]>} action - Action payload containing the array of products.
     */
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },

    /**
     * Sets the selected country filter.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<string>} action - Action payload containing the selected country.
     */
    setCountryFilter: (state, action: PayloadAction<string>) => {
      state.countryFilter = action.payload
      state.currentPage = 1
    },

    /**
     * Updates the selected price range filter.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<{ lower: number; upper: number }>} action - Action payload containing lower and upper bounds.
     */
    setPriceRangeFilter: (
      state,
      action: PayloadAction<{ lower: number; upper: number }>,
    ) => {
      state.priceRangeFilter.lower = action.payload.lower
      state.priceRangeFilter.upper = action.payload.upper
      state.currentPage = 1
    },

    /**
     * Sets the current sorting option.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<SortEnum>} action - Action payload containing the selected sorting method.
     */
    setSorting: (state, action: PayloadAction<SortEnum>) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },

    /**
     * Resets all filters to their default values.
     *
     * @param {ProductState} state - The current product state.
     */
    resetFilter: state => {
      state.priceRangeFilter.lower = VITE_MIN_PRICE_FILTER
      state.priceRangeFilter.upper = VITE_MAX_PRICE_FILTER
      state.countryFilter = "All"
      state.currentPage = 1
    },

    /**
     * Controls the visibility of the filter drawer.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<boolean>} action - Action payload to show or hide the drawer.
     */
    setIsShowFilterDrawer: (state, action: PayloadAction<boolean>) => {
      state.isShowFilterDrawer = action.payload
    },

    /**
     * Controls the current page of home page.
     *
     * @param {ProductState} state - The current product state.
     * @param {PayloadAction<boolean>} action - Action payload current page.
     */
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload
      },
  },
})

export const {
  setProducts,
  setCountryFilter,
  setPriceRangeFilter,
  setSorting,
  resetFilter,
  setIsShowFilterDrawer,
  setCurrentPage
} = productSlice.actions

// Selectors
/**
 * Selector to get all products.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {Product[]} - The array of products.
 */
export const getProducts = (state: RootState) => state.product.products

/**
 * Selector to get the current country filter.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {string} - The country filter.
 */
export const getCountryFilter = (state: RootState) =>
  state.product.countryFilter

/**
 * Selector to get the current price range filter.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {PriceRangeFilter} - The price range filter.
 */
export const getPriceRangeFilter = (state: RootState) =>
  state.product.priceRangeFilter

/**
 * Selector to check if the filter drawer is visible.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {boolean} - True if the filter drawer is visible, false otherwise.
 */
export const getIsShowFilterDrawer = (state: RootState) =>
  state.product.isShowFilterDrawer

/**
 * Selector to get current page.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {number}.
 */
export const getCurrentPage = (state: RootState) =>
  state.product.currentPage

/**
 * Selector to count the number of applied filters.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {number} - The count of active filters.
 */
export const getCurrentCountFilterApply = createSelector(
  [getCountryFilter, getPriceRangeFilter],
  (countryFilter, priceRangeFilter) => {
    let count = 0
    if (countryFilter !== "All") count++
    if (priceRangeFilter.lower !== VITE_MIN_PRICE_FILTER || priceRangeFilter.upper !== VITE_MAX_PRICE_FILTER) count++
    return count
  },
)

/**
 * Selector to get the sorted and filtered list of products based on the active filters.
 *
 * @param {RootState} state - The root state of the Redux store.
 * @returns {Product[]} - The array of filtered and sorted products.
 */
export const selectSortedFilteredProducts = createSelector(
  [
    getProducts,
    getCountryFilter,
    getPriceRangeFilter,
    (state: RootState) => state.product.sortBy,
  ],
  (products, countryFilter, priceRangeFilter, sortBy) => {
    const filteredProducts = products
      .map(product => {
        const matchesCountry =
          countryFilter === "All" ||
          product.shippable_countries.includes(countryFilter)
        const matchesPriceRange =
          (priceRangeFilter.lower === VITE_MIN_PRICE_FILTER && priceRangeFilter.upper === VITE_MAX_PRICE_FILTER) ||
          ((product.price.price_in_cents/100) >= priceRangeFilter.lower &&
            (priceRangeFilter.upper !== VITE_MAX_PRICE_FILTER
              ? (product.price.price_in_cents/100) <= priceRangeFilter.upper
              : true))
        if (
          matchesCountry &&
          matchesPriceRange &&
          !VITE_REVERSE_BRAND.includes(product.brand)
   
        ) {
          return product
        } else if (
          matchesCountry &&
          matchesPriceRange &&
          VITE_REVERSE_BRAND.includes(product.brand)
        ) {
          return {
            ...product,
            brand: product.brand.split("").reverse().join(""),
          }
        } else {
          return null
        }
      })
      .filter(product => product !== null)

    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case SortEnum.PriceAsc:
          return a.price.price_in_cents - b.price.price_in_cents
        case SortEnum.PriceDesc:
          return b.price.price_in_cents - a.price.price_in_cents

        default:
          return 0
      }
    })
  },
)

export default productSlice.reducer
