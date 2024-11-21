// app/page.tsx

import Link from 'next/link';
import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';
import Htag from '@/components/Htag/Htag';
import type { Metadata } from 'next';
import React from 'react';

// Типы для постов
interface PostNode {
	id: string;
	excerpt: string;
	title: string;
	slug: string;
}

interface PostEdge {
	node: PostNode;
}

interface PostsData {
	posts: {
		edges: PostEdge[];
	};
}

// Типы для страницы
interface Seo {
	metaDesc: string;
	title: string;
}

interface HeroImageNode {
	altText?: string;
	link: string;
}

interface HeroImage {
	node: HeroImageNode;
}

interface HomeContent {
	heroImage: HeroImage;
	heroText: string;
	heroBtn: string;
	hitext: string;
}

interface PageNode {
	seo: Seo;
	home: HomeContent;
}

interface HomePageData {
	page: PageNode;
}

// Объединенный тип, если потребуется
type CombinedData = PostsData & HomePageData;

// Дополнительные типы, если нужны поля, отсутствующие в запросах
interface PostProps extends PostNode {
	path: string;
	// Добавьте другие поля здесь, если вы планируете их получать
}

// Статические метаданные страницы
export const metadata: Metadata = {
	title: 'Главная',
};

const HomePage = async () => {
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient();

	// Запрос постов
	const { data: postsData } = await apolloClient.query<PostsData>({
		query: gql`
			query PostsContents {
				posts {
					edges {
						node {
							id
							excerpt
							title
							slug
						}
					}
				}
			}
		`,
	});

	// Запрос контента страницы
	const { data: pageData } = await apolloClient.query<HomePageData>({
		query: gql`
			query Home {
				page(id: "cG9zdDo3OA==") {
					seo {
						metaDesc
						title
					}
					home {
						heroImage {
							node {
								altText
								link
							}
						}
						heroText
						heroBtn
						hitext
					}
				}
			}
		`,
	});

	// Обработка данных постов
	const posts: PostProps[] =
		postsData?.posts.edges.map(({ node }) => ({
			...node,
			path: `/posts/${node.slug}`,
			// Если у вас есть другие поля, добавьте их здесь
		})) || [];

	// Обработка данных страницы
	const page = {
		...pageData?.page,
		...pageData?.page.home,
		heroImageAltText: pageData?.page.home.heroImage.node.altText,
		heroImageLink: pageData?.page.home.heroImage.node.link,
	};

	return (
		<div className="cont">
			<Htag tag="h1">my-next - это облегченный стартер</Htag>
			<ul>
				{posts.length > 0 ? (
					posts.map((post) => (
						<li key={post.slug}>
							<div className="cont">
								<Link href={post.path}>
									<h3
										dangerouslySetInnerHTML={{
											__html: post.title,
										}}
									/>
									<div
										dangerouslySetInnerHTML={{
											__html: post.excerpt,
										}}
									/>
								</Link>
								<Link href={post.path} className="underline">
									Читать статью
								</Link>
							</div>
						</li>
					))
				) : (
					<li>
						<p>Oops, no posts found!</p>
					</li>
				)}
			</ul>
		</div>
	);
};

export default HomePage;