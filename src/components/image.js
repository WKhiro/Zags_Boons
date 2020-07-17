import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
          absolutePath: { regex: "/images/" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
      dataJson {
        gods {
          aphrodite {
            boons {
              name
              upgrades {
                name
                other
              }
              iconurl
            }
          }
          ares {
            boons {
              name
            }
          }
        }
      }
    }
  `)
  function test(ind) {
    {
      ind.upgrades.map((testName, index) => {
        console.log(testName.name)
        console.log(testName.other)
      })
    }
  }
  /*
returns the name aphrodite
     {data.dataJson.gods.map((godType, index) => (
        <h1>{godType.aphro.name}</h1>
      ))}

            {data.dataJson.gods.map((godType, index) => (
        <h1 key={index}>{godType.aphrodite.boons[0].name}</h1>
      ))}

            {data.allFile.edges.map(({ node }, i) => (
        <Img key={i} fluid={node.childImageSharp.fluid} alt={node.name} />
      ))}
*/
  return (
    <div>
      <div>
        {data.dataJson.gods.map((godType, index) => {
          return godType.aphrodite.boons.map((boonType, index2) => {
            return <h1>{boonType.name}</h1>
          })
        })}
      </div>
      <div>
        {data.dataJson.gods.map((godType, index) => {
          return godType.aphrodite.boons.map((boonType, index2) => {
            return (
              <button key={index}>
                <img
                  src={boonType.iconurl}
                  alt=""
                  onClick={() => {
                    test(boonType)
                  }}
                ></img>
              </button>
            )
          })
        })}
      </div>
    </div>
  )
}

export default Image
