const schema = `
type Mutation {
    
}

type Query {
    influencer(id: ID, limit: Int): [Influencer!]!
    brand(id: ID, limit: Int): [Brand!]!
    user(id: ID, limit: String): [User!]!
}

type InstagramPost {
    id: ID!
    photo: String!
    caption: String
    createdAt: String!
    profilePhoto: String!
    tags: [String!]!
    link: String!
    location: String
}

type Offer {
    id: ID!
    name: String
    description: String
    discount: String
    website: String
    location: String
    hashtags: [String!]!
    terms: [String!]!
}

type Coupon {
    brandId: ID!
    offerId: ID!
    instagramPostID: ID!
    status: String!
    redeemCount: Int!
}

type Influencer {
    id: ID!
    instagramHandle: String!
    profilePhoto: String!
    feed: [InstagramPost!]!
    coupons: [Coupon!]!
    testItem: Boolean
}

type Brand {
    id: ID!
    name: String
    description: String
    website: String
    location: String
    offers: [Offer!]!
    testItem: Boolean
}

type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    permissions: Permissions!
    influencers: [Influencer!]!
    brands: [Brand!]!
    testItem: Boolean
}


schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}`;

// eslint-disable-next-line import/prefer-default-export
export { schema };
