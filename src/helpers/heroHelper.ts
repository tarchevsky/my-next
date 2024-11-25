import {PageData} from "@/graphql/types/pageTypes";

export const extractHeroData = (page: PageData['page']) => {
    if (!page.home) {
        throw new Error('Home data is missing in the page');
    }

    const { heroImage, heroText, heroBtn } = page.home;

    if (!heroImage || !heroImage.node) {
        throw new Error('Hero image node is missing');
    }

    const { link, altText } = heroImage.node;

    return { link, altText, heroText, heroBtn };
};