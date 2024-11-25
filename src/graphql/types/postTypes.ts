export interface PostNode {
    id: string;
    excerpt: string;
    title: string;
    slug: string;
}

export interface PostEdge {
    node: PostNode;
}

export interface PostsData {
    posts: {
        edges: PostEdge[];
    };
}

export interface PostProps extends PostNode {
    path: string;
    // Добавьте другие поля здесь, если необходимо
}

export interface Post {
    id: string;
    content: string;
    title: string;
    slug: string;
    featuredImage?: {
        node: {
            link: string;
            altText: string;
        };
    };
    seo: {
        title: string;
        metaDesc: string;
    };
}

export interface SiteSettings {
    title: string;
}