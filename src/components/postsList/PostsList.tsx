import React from 'react';
import Link from 'next/link';
import { PostProps } from '@/graphql/types/postTypes';

interface PostsListProps {
    posts: PostProps[];
}

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
    if (posts.length === 0) {
        return (
            <ul>
                <li>
                    <p>Пока здесь нет постов</p>
                </li>
            </ul>
        );
    }

    return (
        <ul>
            {posts.map((post) => (
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
            ))}
        </ul>
    );
};

export default PostsList