import {PostsData} from "@/graphql/types/postTypes";

export interface Seo {
    metaDesc: string;
    title: string;
}

export interface HeroImageNode {
    altText?: string;
    link: string;
}

export interface HeroImage {
    node: HeroImageNode;
}

export interface Content {
    heroImage: HeroImage;
    heroText: string;
    heroAlt: string;
    heroBtn: string;
    hiText: string;
}

export interface PageNode {
    seo: Seo;
    home: Content;
}

export interface PageData {
    page: PageNode;
}

export type CombinedData = PostsData & PageData;