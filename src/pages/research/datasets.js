import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import "../../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../../components/layout.js";


const IndexPage = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {
        datasets: markdownRemark(
          fields: { category: { eq: "research/datasets" } }
          fileAbsolutePath: { regex: "/datasets.md/" }
        ) {
          html
          frontmatter {
            title
          }
        }
  
 		software: markdownRemark(
         	fields: { category: { eq: "research/datasets" } }
          fileAbsolutePath: { regex: "/software.md/" }
        ) {
          html
          frontmatter {
            title
          }
        }
      }
    `);

  return (
    <Layout name="Datasets" crumbs={crumbs}>
      <section className="section">
        <h1 className="title">{data.software.frontmatter.title}</h1>
        <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data.software.html }}
        ></div>
      </section>
      <section className="section">
        <h2 className="title">{data.datasets.frontmatter.title}</h2>
        <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data.datasets.html }}
        ></div>
      </section>
    </Layout>
  );
}

export default IndexPage

export const Head = () => <title>Datasets and Code</title>
