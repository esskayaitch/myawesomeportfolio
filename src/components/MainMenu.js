import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"
import SiteInfo from "./SiteInfo"

const MainmenuWrapper = styled.div`
  display: flex;
  background-color: rgb(3, 27, 77);
  height: 80px;
`

const MainMenuInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  width: 960px;
  height: 100%;
`

const MenuItem = styled(Link)`
  color: white;
  display: block;
  padding: 30px 16px;
`

const MainMenu = () => (
  <StaticQuery
    query={graphql`
      {
        allWpMenu(filter: { slug: { eq: "main-menu" } }) {
          nodes {
            menuItems {
              nodes {
                path
                label
              }
            }
          }
        }
      }
    `}
    render={props => (
      <MainmenuWrapper>
        <MainMenuInner>
          <SiteInfo />
          {props.allWpMenu.nodes[0].menuItems.nodes.map(item => (
            <MenuItem to={item.path} key={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </MainMenuInner>
      </MainmenuWrapper>
    )}
  />
)

export default MainMenu
