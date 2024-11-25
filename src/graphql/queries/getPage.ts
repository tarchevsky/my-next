import { gql } from '@apollo/client';

export const GET_PAGE = gql`
    query GetPage($id: ID!) {
        page(id: $id) {
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
`;