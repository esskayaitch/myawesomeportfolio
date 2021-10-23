/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import MainMenu from "./MainMenu"
import Footer from "./footer"
// import Header from "./header"

import styled, { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
import "@fontsource/open-sans";
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0 !important;
  padding: 0 !important;
}
`
// const GlobalStyles = createGlobalStyle`
// @import url('@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');');
// body {
//   font-family: 'Open Sans', sans-serif;
//   margin: 0 !important;
//   padding: 0 !important;
// }
// `

const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <MainMenu />
    <LayoutWrapper>{children}</LayoutWrapper>
    <Footer />
  </div>
)

export default Layout
