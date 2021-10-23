import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const FeaturedImage = styled.img`
  max-width: 300px;
  margin: 10px;
  float: right;
`

const Project = ({ pageContext }) => (
  <Layout>
    <h1>{pageContext.title}</h1>
    <strong>Website URL: </strong>
    <a href={pageContext.projectsACF.projectUrl}>
      {pageContext.projectsACF.projectUrl}
    </a>
    <div>
      <FeaturedImage src={pageContext.featuredImage.node.sourceUrl} />
      <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
    </div>
  </Layout>
)
export default Project
