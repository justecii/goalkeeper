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
    username: String
    subgoals: [Subgoal]
    goalTarget: String!
    currentProgress: String
    progressPercent: String
}

type Subgoal {
    _id: ID
    name: String!
    createdDate: String
    goal: [Goal]
    username: String
    goalTarget: String!
    targetDate: String
    currentProgress: String!
    progressPercent: String
}

type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    getGoal(_id: ID!): Goal
    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User 
    getUserRecipes(username: String!): [Recipe]
    getUserGoals(username: String!): [Goal]
}

type Token {
    token: String!
}

type Mutation {
    addGoal(name: String!, category: String!, username: String, goalTarget: String!, currentProgress: String): Goal
    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
    deleteUserRecipe(_id: ID!): Recipe
    likeRecipe(_id: ID!, username: String!): Recipe
    unlikeRecipe(_id: ID!, username: String!): Recipe
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
}

`;
