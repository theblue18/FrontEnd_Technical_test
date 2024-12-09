import React, { useCallback, useMemo } from "react"
import type { SliderSingleProps } from "antd"
import {
  Row,
  Typography,
  Select,
  Slider,
  Space,
  Divider,
  Button,
  message,
} from "antd"
import styles from "./FilterComponent.module.css"
import { useAppDispatch, useAppSelector } from "../../stores/hooks"
import { getCountries } from "../../reducers/countrySlice"
import { FilterOutlined } from "@ant-design/icons"
import {
  getCountryFilter,
  getPriceRangeFilter,
  resetFilter,
  setCountryFilter,
  setPriceRangeFilter,
} from "../../reducers/productSlice"
import { debounce } from "lodash"
const VITE_MIN_PRICE_FILTER = Number(import.meta.env.VITE_MIN_PRICE_FILTER) || 0
const VITE_MAX_PRICE_FILTER = Number(import.meta.env.VITE_MAX_PRICE_FILTER) || 2000

/**
 * FilterComponent
 * A React component providing filters for countries, price range for products.
 * The component uses Redux for managing filter state and allows users to reset filters as needed.
 *
 * @component
 * @returns {JSX.Element} - Rendered filter component
 */
const FilterComponent: React.FC = React.memo(() => {
  // Retrieve countries and filter values from Redux store
  const countries = useAppSelector(getCountries)
  const countryFilter = useAppSelector(getCountryFilter)
  const priceRangeFilter = useAppSelector(getPriceRangeFilter)
  const dispatch = useAppDispatch()

  /**
   * Updates the selected country filter in Redux
   * @param {string} value - The selected country value
   */
  const handleCountryChange = useCallback(
    (value: string) => {
      dispatch(setCountryFilter(value))
    },
    [dispatch],
  )

  /**
   * Updates the selected price range filter in Redux
   * @param {number[]} value - An array containing lower and upper values for price range
   */
  const handlePriceRangeChange = useCallback(
    (value: number[]) => {
      if (value.length === 2) {
        dispatch(setPriceRangeFilter({ lower: value[0], upper: value[1] }))
      }
    },
    [dispatch],
  )

  /**
   * Debounced function to handle price range changes more smoothly
   * Uses debounce to limit the frequency of Redux updates as user adjusts the slider
   */
  const debouncedHandlePriceRangeChange = useMemo(
    () => debounce(handlePriceRangeChange, 100),
    [handlePriceRangeChange],
  )

  /**
   * Determines if the reset filter button should be disabled
   * @returns {boolean} - Returns true if no filters have been applied
   */
  const isDisableResetFilter = useMemo(() => {
    return (
      countryFilter === "All" &&
      priceRangeFilter.lower === VITE_MIN_PRICE_FILTER &&
      priceRangeFilter.upper === VITE_MAX_PRICE_FILTER
    )
  }, [countryFilter, priceRangeFilter])

  /**
   * Resets all filter values to their default states in Redux
   * Displays a success message upon successful reset
   */
  const callResetFilter = useCallback(() => {
    dispatch(resetFilter())
    message.success("Reset filter success")
  }, [dispatch])

  /**
   * Defines marks for the price range slider
   */

  const marks: SliderSingleProps["marks"] = useMemo(
    () => ({
      [VITE_MIN_PRICE_FILTER]: {
        style: {
          marginTop: 10,
        },
        label: <strong>{`€${VITE_MIN_PRICE_FILTER}`}</strong>,
      },
      500: {
        style: {
          marginTop: 10,
        },
        label: <strong>€500</strong>,
      },
      1500: {
        style: {
          marginTop: 10,
        },
        label: <strong>€1500</strong>,
      },
      [VITE_MAX_PRICE_FILTER]: {
        style: {
          marginTop: 10,
        },
        label: <strong>{`€${VITE_MAX_PRICE_FILTER}+`}</strong>,
      },
    }),
    [],
  )

  return (
    <div className={styles.filterContainer}>
      {/* Filter Header */}
      <Row justify={"start"} align={"middle"} className={styles.titleFilter}>
        <Space>
          <FilterOutlined style={{ fontSize: "16px" }} />
          <Typography.Text className={styles.titleFilter}>
            FILTER
          </Typography.Text>
        </Space>
      </Row>
      <Divider style={{ margin: "10px 0px" }} />

      {/* Country Filter */}
      <Row>
        <Typography.Text className={styles.typeOfFilter}>
        Shippable Country
        </Typography.Text>
      </Row>
      <Row>
        <Select
          onChange={handleCountryChange}
          value={countryFilter}
          className={styles.countryFilter}
        >
          <Select.Option
            key={"All"}
            value={"All"}
            data-testid={`category-option-all`}
          >
            ALL
          </Select.Option>
          {countries?.map(country => (
            <Select.Option
              key={country.code}
              value={country.code}
              data-testid={`county-option-${country.code}`}
            >
              {country.name}
            </Select.Option>
          ))}
        </Select>
      </Row>

      <Divider style={{ margin: "10px 0px" }} />

      {/* Price Range Filter */}
      <Row>
        <Typography.Text className={styles.typeOfFilter}>
          Price Range
        </Typography.Text>
      </Row>
      <Row>
        <div className={styles.sliderContainer}>
          <Slider
            marks={marks}
            range
            value={[priceRangeFilter.lower, priceRangeFilter.upper]}
            min={VITE_MIN_PRICE_FILTER}
            max={VITE_MAX_PRICE_FILTER}
            step={null}
            onChange={debouncedHandlePriceRangeChange}
          />
        </div>
      </Row>

      <Divider style={{ margin: "20px 0px" }} />

      {/* Reset Filter Button */}
      <Row>
        <Button
          block
          className={styles.resetBtn}
          disabled={isDisableResetFilter}
          onClick={callResetFilter}
        >
          Reset Filter
        </Button>
      </Row>
    </div>
  )
})

export default FilterComponent
