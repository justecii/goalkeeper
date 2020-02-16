exports.typeDefs = `

type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String!
    email: String! @unique
    joinDate: String
    favorites: [Recipe]
    goals: [Goal]
}

type Goal {
    _id: ID
    name: String!
    createdDate: String
    category: String!
    user: [User]
    subgoals: [Subgoal]
    target: String!
    progress: String!
    progressPercent: String
}

type Subgoal {
    _id: ID
    name: String!
    createdDate: String
    goal: [Goal]
    user: [User]
    target: String!
    targetDate: String
    progress: String!
    progressPercent: String
}

type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User 
    getUserRecipes(username: String!): [Recipe]
}

type Token {
    token: String!
}

type Mutation {
    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
    deleteUserRecipe(_id: ID!): Recipe
    likeRecipe(_id: ID!, username: String!): Recipe
    unlikeRecipe(_id: ID!, username: String!): Recipe
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
}

`;
