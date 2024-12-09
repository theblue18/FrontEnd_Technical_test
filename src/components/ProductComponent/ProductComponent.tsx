import React from "react"
import {
  Row,
  Typography,
  Image,
  Tag,
  Button,
  Divider,
  Col,
  Space,
  Avatar,
} from "antd"
import styles from "./ProductComponent.module.css"
import type { Product } from "../../types/common.types"
import { calculateDepositTimeSince, getColorFromBrand } from "../../utils/utils"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { UserOutlined } from "@ant-design/icons"

const VITE_PROMOTION_BRAND = (import.meta.env.VITE_PROMOTION_BRAND || "Off-White")
  .split(",")
  .map((brand: string) => brand.trim()) 
  .filter(Boolean) as string[]; 

/**
 * ProductComponent
 * A React component to display product details in a card format, including image, title, category, price, and rating.
 * Allows users to add the product to the cart and displays relevant product information.
 *
 * @component
 * @param {Product} props - Product properties including id, image, title, category, price, and rating
 * @returns {JSX.Element} - The rendered product card component
 */
const ProductComponent: React.FC<Product> = React.memo(props => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardContainer}>
        <div className={styles.productInfo}>
          {/* Product Image */}
          <Row justify="center" className={styles.productInfoRow}>
            <Image
              width={"100px"}
              height={"100px"}
              src="error"
              fallback="data:image/png;base64,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"
            />
          </Row>

          {/* Product Name */}
          <Row justify={"center"} className={styles.productInfoRow}>
            <Typography.Text className={styles.nameProduct}>
              {props.name}
            </Typography.Text>
          </Row>

          {/* Product Brand Tag */}
          <Row justify={"center"} className={styles.productInfoRow}>
            <Tag color={getColorFromBrand(props.brand)}>{props.brand}</Tag>
          </Row>

          <Divider style={{ margin: "10px 0px" }} />

          {/* Product Deposit*/}
          <Row justify={"start"} className={styles.productInfoRow}>
            <Typography.Text className={styles.depositOnProduct}>
              {calculateDepositTimeSince(props.deposited_on)}
            </Typography.Text>
          </Row>
          {/* Product Shippable Country */}
          <Row justify={"start"} className={styles.productInfoRow}>
            <Space>
              <Typography.Text className={styles.shippableLabel}>Shippable Country:</Typography.Text>
              <div>
                {props.shippable_countries.map(countryCode => {
                  return (
                    <Tag key={`product_ship_tag_${props.id}_${countryCode}`}>
                      {countryCode}
                    </Tag>
                  )
                })}
              </div>
            </Space>
          </Row>

          {/* Product Seller */}
          <Row justify={"start"} className={styles.productInfoRow}>
            <Space>
              <Typography.Text className={styles.sellerLabel}>Seller:</Typography.Text>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                <Typography.Text>{props.seller.name}</Typography.Text>
              </Space>
            </Space>
          </Row>
        </div>

        <div className={styles.productFooter}>
          <Divider style={{ margin: "10px 0px" }} />

          {/* Product Price and Add to Cart Button */}
          <Row
            justify="space-around"
            className={styles.productInfoRow}
            align={"middle"}
          >
            <Col>
              {VITE_PROMOTION_BRAND.includes(props.brand) && (
                <Row>
                  <Typography.Text className={styles.oldPriceProduct}>
                    {props.price.price}
                  </Typography.Text>
                </Row>
              )}
              <Row>
                <Typography.Text className={styles.priceProduct}>
                  {VITE_PROMOTION_BRAND.includes(props.brand)
                    ? `${((props.price.price_in_cents * 0.9) / 100).toFixed(2)} ${props.price.currency}`
                    : `${props.price.price}`}
                </Typography.Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Button className={styles.addToCartBtn}>
                  <ShoppingCartOutlined />
                  Add to cart
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
})

export default ProductComponent
