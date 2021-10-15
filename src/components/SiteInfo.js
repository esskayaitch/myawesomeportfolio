import React from "react"
import { graphql, StaticQuery } from "gatsby"
import styled from "styled-components"

const SiteInfoWrapper = styled.div`
  flex-grow: 1;
  color: white;
  margin: auto 0;
`
const SiteTitle = styled.div`
  font-weight: bold;
`

const SiteInfo = () => (
  <StaticQuery
    query={graphql`
      {
        allWp {
          edges {
            node {
              generalSettings {
                title
                description
              }
            }
          }
        }
      }
    `}
    render={props => (
      <SiteInfoWrapper>
        <SiteTitle>
          <div>{props.allWp.edges[0].node.generalSettings.title}</div>
        </SiteTitle>

        <div
          dangerouslySetInnerHTML={{
            __html: props.allWp.edges[0].node.generalSettings.description,
          }}
        />
      </SiteInfoWrapper>
    )}
  />
)

export default SiteInfo
