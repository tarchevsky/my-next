import React from 'react'
import { Metadata } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { fetchSeoMetadata } from '@/lib/seo'
import { getApolloClient } from '@/lib/apollo-client'
import Hero from '@/components/hero/Hero'

import { GET_POSTS } from '@/graphql/queries/getPosts'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { PostsData, PostProps } from '@/graphql/types/postTypes'
import { PageData } from '@/graphql/types/pageTypes'
import { extractHeroData } from "@/helpers/heroHelper"
import PostsList from "@/components/postsList/PostsList";

export async function generateMetadata(): Promise<Metadata> {
	const pageId = 'cG9zdDo3OA=='; // Замените на соответствующий ID для главной страницы
	const seo = await fetchSeoMetadata(pageId);

	return {
		title: seo.title,
		description: seo.description,
	};
}

const HomePage = async () => {
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient();

	const pageId = 'cG9zdDo3OA=='; // ID твоей главной страницы

	// Параллельное выполнение запросов
	const [pageResult, postsResult] = await Promise.all([
		apolloClient.query<PageData>({
			query: GET_PAGE,
			variables: { id: pageId },
		}),
		apolloClient.query<PostsData>({
			query: GET_POSTS,
		}),
	]);

	const page = pageResult.data.page;
	const heroData = extractHeroData(page);

	const postsData = postsResult.data;
	// Обработка данных постов
	const posts: PostProps[] =
		postsData?.posts.edges.map(({ node }) => ({
			...node,
			path: `/posts/${node.slug}`,
			// Добавьте другие поля, если необходимо
		})) || [];

	return (
		<div className="cont">
			{page.home && (
				<Hero
					src={heroData.link}
					alt={heroData.altText}
					title={heroData.heroText}
					buttonText={heroData.heroBtn}
				/>
			)}

			<PostsList posts={posts} /> {/* Используем новый компонент */}
		</div>
	);
};

export default HomePage;