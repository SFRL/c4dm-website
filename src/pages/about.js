import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../components/layout.js";
import ParallelogramHeader from "../components/parallelogramHeader"; 

const AboutPage = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {
        about: markdownRemark(
          fields: { category: { eq: "about" } }
          fileAbsolutePath: { regex: "/about-long.md/" }
        ) {
          html
          frontmatter {
            title
            video
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 400)
              }
            }
          }
        }
      }
    `);

  return (
    <Layout name="about" crumbs={crumbs}>
      <section className="section">
        <ParallelogramHeader
          text="About"
          backgroundColor="primary"
          textColor="white"
          className="mb-6"
        />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: data.about.html }}
        ></div>
      </section>
    </Layout>
  );
}

export default AboutPage

export const Head = () => <title>About</title>
