import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { Card, CardDeck } from 'react-bootstrap'

const { BLOG_URL, CONTENT_API_KEY } = process.env

type Post = {
  title: string
  slug: string
  custom_excerpt: string
}

async function getPosts() {

  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json())

  const posts = res.posts
  console.log(posts)
  return posts
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts()
  return {
    revalidate: 10,
    props: { posts }
  }
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props

  return (
    <div className={styles.container}>
      <h1>Hello to my blog</h1>
      <div>
        <CardDeck>
          {posts.map((post, index) => {
            return (
<Card className="p-3" key={index}>
                  <Card.Img />
                <Card.Title>
                  <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                </Card.Title>
                <Card.Body>{post.custom_excerpt}</Card.Body>
                <footer className="blockquote-footer">
        <small className="text-muted">
        <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                    <a>Read More</a>
                  </Link>
        </small>
      </footer>
              </Card>
            )
          })}
        </CardDeck>
      </div>
    </div>
  )
}

export default Home