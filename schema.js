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
    debts: [Debt]
    assets: [Asset]
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
    goalStart: String
}

type Subgoal {
    _id: ID
    name: String!
    createdDate: String
    goal: Goal
    username: String
    goalTarget: String!
    targetDate: String
    currentProgress: String!
    goalStart: String
}

type Debt {
    _id: ID
    name: String!
    category: String!
    currentDebt: Float!
    totalCreditLine: Float
    interestRate: Float
    createdDate: String
    debtAtCreation: Float!
    user: ID
}

type Asset {
    _id: ID
    name: String!
    category: String!
    currentValue: Float!
    interestRate: Float
    createdDate: String
    quantity: Int
    user: ID
}

type Query {
    getAllRecipes: [Recipe]
    getRecipe(_id: ID!): Recipe
    getGoal(_id: ID!): Goal
    getAsset(_id: ID!): Asset
    getDebt(_id: ID!): Debt
    searchRecipes(searchTerm: String): [Recipe]

    getCurrentUser: User 
    getUserRecipes(username: String!): [Recipe]
    getUserGoals(username: String!): [Goal]
    getUserAssets(user: ID!): [Asset]
    getUserDebts(user: ID!): [Debt]
}

type Token {
    token: String!
}

type Mutation {
    addGoal(name: String!, category: String!, username: String, goalTarget: String!, currentProgress: String, goalStart: String): Goal
    addRecipe(name: String!, description: String!, category: String!, instructions: String!, username: String): Recipe
    addAsset(name: String!, category: String!, currentValue: Float!, interestRate: Float, quantity: Int, user: ID): Asset
    addDebt(name: String!, category: String!, currentDebt: Float!, totalCreditLine: Float, interestRate: Float, debtAtCreation: Float!, user: ID): Debt
    deleteUserRecipe(_id: ID!): Recipe
    deleteUserAsset(_id: ID!): Asset
    deleteUserDebt(_id: ID!): Debt
    deleteUserGoal(_id: ID!): Goal
    likeRecipe(_id: ID!, username: String!): Recipe
    unlikeRecipe(_id: ID!, username: String!): Recipe
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token
}

`;
