import React, {useState, useCallback} from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import ParallelogramHeader from "../components/parallelogramHeader";
import TableCard from "../components/tableCard";
import TagSelector from "../components/tagSelector";

const firstColumn = (image) => (
  <>
    {image ? (
      <GatsbyImage alt="picture of person" image={image.childImageSharp.gatsbyImageData} />
    ) : (
      <StaticImage
        alt="default picture as no picture was specified"
        src="../content/people/defaultprofile.png"
      />
    )}
  </>
);

const secondColumn = (name, acadposition) => (          
                  <>
                    <p className="title is-4">{name || "Name"}</p>
                    <p className="subtitle is-7">{acadposition || "Academic Position"}</p>
                  </>
                );

const thirdColumn = (blurb) => (<p className="is-3">{blurb || "description"}  </p>);

const People = ({pageContext}) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext
    const data = useStaticQuery(graphql`
      {people: allMarkdownRemark(
          filter: { fields: { category: { eq: "people" } } }
          sort: { frontmatter: { role: ASC } }
        ) {
          nodes {
            frontmatter {
              image {
                childImageSharp {
                  gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
                }
              }
              
              name
              role
              url
              acadposition
              blurb
              themes
              role
            }
            id
          }
        }
        allTags: allMarkdownRemark(
          limit: 20000
          filter: { fields: { category: { eq: "people" } } }
        ) {
          group(field: { frontmatter: { role: SELECT } }) {
            fieldValue
            totalCount
          }
        }
      }
    `);

const groups = data.people;

    const [filteredNodes, setFilteredNodes] = useState(data.people.nodes);

    const getFilteredNodes = useCallback(
      (nodes) => {
        setFilteredNodes(nodes);
      },
      [setFilteredNodes]
    );

    // some of the students have no academic role, the markdown frontmatters need to be updated, removing role and putting them in academic position

    return (
      <Layout name="People" crumbs={crumbs}>
        <section className="section">
          <ParallelogramHeader
            text="People"
            backgroundColor="primary"
            textColor="white"
            className="mb-6"
          />
          <TagSelector
              tags={data.allTags}
              nodes={data.people.nodes}
              callback={getFilteredNodes}
            />
            <div className="lowerPadding"></div>

            
            

        </section>
      </Layout>
    );
}

export default People;