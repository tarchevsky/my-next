// app/posts/[slug]/page.tsx

import Link from 'next/link'
import { gql } from '@apollo/client'
import { notFound } from 'next/navigation'

import { getApolloClient } from '@/lib/apollo-client'

// Типизация данных поста
interface Post {
    id: string
    content: string
    title: string
    slug: string
    featuredImage?: {
        node: {
            link: string
            altText: string
        }
    }
    seo: {
        title: string
        metaDesc: string
    }
}

interface SiteSettings {
    title: string
}

interface PageProps {
    params: {
        slug: string
    }
}

const PostPage = async ({ params }: PageProps) => {
    const { slug } = params
    const apolloClient = getApolloClient()

    // Выполнение запроса к GraphQL API
    const { data } = await apolloClient.query({
        query: gql`
            query PostBySlug($slug: String!) {
                generalSettings {
                    title
                }
                postBy(slug: $slug) {
                    id
                    content
                    title
                    slug
                    featuredImage {
                        node {
                            link
                            altText
                        }
                    }
                    seo {
                        title
                        metaDesc
                    }
                }
            }
        `,
        variables: { slug }
    })

    const post: Post | null = data?.postBy
    const site: SiteSettings = data?.generalSettings

    // Обработка случая, когда пост не найден
    if (!post) {
        notFound()
    }

    return (
        <div>
            <div className='relative'>
                <main>
                    {post.featuredImage ? (
                        <>
                            <img
                                src={post.featuredImage.node.link}
                                alt={post.featuredImage.node.altText}
                                className='h-[90svh] w-full object-cover brightness-50'
                            />
                            <Link
                                href='/'
                                className='absolute top-[16px] left-[16px] sm:top-[40px] sm:left-[40px] md:top-[40px] md:left-[100px] 2xl:left-[200px] text-white'
                            >
                                &lt; Назад
                            </Link>
                            <div className='absolute bottom-[16px] left-[16px] sm:bottom-[40px] sm:left-[40px] md:bottom-[40px] md:left-[100px] 2xl:left-[200px] flex flex-col'>
                                <h1 className='text-white'>{post.title}</h1>
                                <div className='text-white'>
                                    Дата: <span>10.10.2010</span>
                                </div>
                                <div className='text-white'>
                                    Рубрика: <span>Блог</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href='/'
                                className='absolute top-[16px] left-[16px] sm:top-[40px] sm:left-[40px] md:top-[40px] md:left-[100px] 2xl:left-[200px] text-white'
                            >
                                &lt; Назад
                            </Link>
                            <div className='absolute flex flex-col'>
                                <h1 className='text-white'>{post.title}</h1>
                                <div className='text-white'>
                                    Дата: <span>10.10.2010</span>
                                </div>
                                <div className='text-white'>
                                    Рубрика: <span>Блог</span>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
            <div className='px-[16px]'>
                <section className='prose m-auto'>
                    <blockquote>
                        <p>Цитата</p>
                    </blockquote>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content
                        }}
                    />
                </section>
            </div>
        </div>
    )
}

export default PostPage

// Генерация статических маршрутов
export async function generateStaticParams() {
    const apolloClient = getApolloClient()

    const { data } = await apolloClient.query({
        query: gql`
            query AllPostSlugs {
                posts {
                    nodes {
                        slug
                    }
                }
            }
        `
    })

    const slugs = data.posts.nodes.map((post: { slug: string }) => ({
        slug: post.slug
    }))

    return slugs
}