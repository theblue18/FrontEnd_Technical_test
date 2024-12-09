import React, {  useCallback } from "react"
import { Layout, Row, Typography } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import styles from "./MainLayout.module.css"


const { Header, Content } = Layout

/**
 * Main Layout Component
 * Provides a layout structure for the application with a header and main content area.
 * Displays the application logo and a dashboard button.
 *
 * @component
 * @returns {JSX.Element} - The rendered Main Layout component
 */
const MainLayout: React.FC = React.memo(() => {

  const navigate = useNavigate()


  /**
   * Navigates to the homepage when the logo is clicked.
   */
  const handleLogoClick = useCallback(() => navigate(`/`), [navigate])

  

  return (
    <Layout className={styles.mainLayoutContainer}>
      <Header className={styles.header}>
        <Row justify="space-between" align="middle">
          <Typography.Title
            level={3}
            className={styles.textLogo}
            onClick={handleLogoClick}
          >
            Vestiaire Collective
          </Typography.Title>
         
        </Row>
      </Header>

      <Layout>
        <Content className={styles.mainContent} >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
})

export default MainLayout
