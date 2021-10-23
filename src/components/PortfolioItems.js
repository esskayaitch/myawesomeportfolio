import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import styled from "styled-components"

const PortfolioItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const PortfolioItem = styled.div`
  width: 300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`
const PortfolioImage = styled.img`
  max-width: 100%;
`

const PortfolioItems = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allWpProject {
            edges {
              node {
                id
                title
                slug
                content
                excerpt
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      `}
      render={props => (
        <PortfolioItemsWrapper>
          {" "}
          {props.allWpProject.edges.map(portfolioItem => (
            <PortfolioItem key={portfolioItem.id}>
              <h2>{portfolioItem.node.title}</h2>
              <PortfolioImage
                src={portfolioItem.node.featuredImage.node.sourceUrl}
                alt="Project"
              />
              <div
                dangerouslySetInnerHTML={{ __html: portfolioItem.node.excerpt }}
              ></div>
              <Link to={`/project/${portfolioItem.node.slug}`}>Read More</Link>
            </PortfolioItem>
          ))}
        </PortfolioItemsWrapper>
      )}
    />
  )
}

export default PortfolioItems
