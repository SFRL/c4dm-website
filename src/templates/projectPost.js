import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import "../style/bulmacustom.scss"
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProjectPost = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Project" crumbs={crumbs}>
        <section className="section" id="header">
          <div className="container">
            <GatsbyImage
              alt="Project header image"
              image={frontmatter.image.childImageSharp.gatsbyImageData}
            />
          </div>
          <div className="container">
            <h1 className="title">{frontmatter.title}</h1>
            <h2 className="subtitle">
              by {frontmatter.author} &mdash; {frontmatter.date}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </section>
      </Layout>
    );
}

export default ProjectPost;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "dddd, D MMMM yyyy")
        author
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;