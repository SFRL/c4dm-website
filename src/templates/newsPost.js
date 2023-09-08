import React from "react";
import { graphql} from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/layout";

const NewsPost = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const {markdownRemark} = data;
    const {frontmatter, fields, html} = markdownRemark;

    return (
      <Layout name="Blog" crumbs={crumbs}>
        <section className="section" id="header">

          <div className="container">
            <h1 className="title">{frontmatter.title}</h1>
            <p >
              by {frontmatter.author} &mdash; {frontmatter.date}
            </p>
            <GatsbyImage
              className="news-image"
              alt="Blogpost header image"
              image={frontmatter.image.childImageSharp.gatsbyImageData}
            />
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </div>
        </section>
      </Layout>
    );
}

export default NewsPost;

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