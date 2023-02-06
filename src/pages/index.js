import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          Ooops, something weird happened. No blog posts found...
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="bio">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        <p>
        Hello, my name is Jacob Grisham, and I'm a software engineer based in San Francisco. I currently lead teams to deliver business-critical projects at PowerSchool.
        With this blog, I'm drawing you a map of trails trekked while coding solutions and sharing campfire stories of building software in the industry, interspersed with autobiographical accounts of your author.
        The content of this blog is a more current reflection of where I am, but you're welcome to check out my <a href={`https://jacobgrisham.com`}>professional portfolio</a> of early software engineering projects.
        </p>
      </div>
      {/* <div>
        <p>Browse curated lists of blog posts based on your profile</p>
        <button>React and AWS technology communities</button>
        <button>Fellow software engineers</button>
        <button>Hiring managers</button>
      </div> */}
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          let color;
          if (post.frontmatter.category === 'Lessons Learned') {
            color = "navy"
          } else if (post.frontmatter.category === 'Problem Solving') {
            color = "gold"
          } else color = "grey"

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small className={`${color} blog-post-category`}>{post.frontmatter.category}</small>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`
