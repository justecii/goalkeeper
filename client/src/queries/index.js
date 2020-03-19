import { gql } from "apollo-boost";
// Goal Queries

// Recipes Queries
export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id
      name
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const GET_ASSET = gql`
  query($_id: ID!) {
    getAsset(_id: $_id) {
      _id
      name
      category
      currentValue
      interestRate
      createdDate
      quantity
    }
  }
`;

export const GET_DEBT = gql`
  query($_id: ID!) {
    getDebt(_id: $_id) {
      _id
      name
      category
      currentDebt
      interestRate
      totalCreditLine
      createdDate
    }
  }
`;

export const GET_GOAL = gql`
  query($_id: ID!) {
    getGoal(_id: $_id) {
      _id
      name
      category
      goalTarget
      goalStart
      currentProgress
      createdDate
      username
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_RECIPE = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;

// Goal Mutations
export const ADD_GOAL = gql`
  mutation(
    $name: String!
    $category: String!
    $username: String
    $goalTarget: String!
    $currentProgress: String
    $goalStart: String
  ) {
    addGoal(
      name: $name
      category: $category
      username: $username
      goalTarget: $goalTarget
      currentProgress: $currentProgress
      goalStart: $goalStart
    ) {
      _id
      name
      createdDate
      category
      username
      goalTarget
      currentProgress
      goalStart
    }
  }
`;

export const DELETE_USER_GOAL = gql`
  mutation($_id: ID!) {
    deleteUserGoal(_id: $_id) {
      _id
    }
  }
`;
// Recipes Mutations

export const ADD_RECIPE = gql`
  mutation(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const ADD_ASSET = gql`
  mutation(
    $name: String!
    $category: String!
    $currentValue: Float!
    $interestRate: Float
    $quantity: Int
    $user: ID
  ) {
    addAsset(
      name: $name
      category: $category
      currentValue: $currentValue
      interestRate: $interestRate
      quantity: $quantity
      user: $user
    ) {
      _id
      name
      category
      currentValue
      interestRate
      createdDate
      quantity
      user
    }
  }
`;

export const DELETE_USER_ASSET = gql`
  mutation($_id: ID!) {
    deleteUserAsset(_id: $_id) {
      _id
    }
  }
`;

export const ADD_DEBT = gql`
  mutation(
    $name: String!
    $category: String!
    $currentDebt: Float!
    $totalCreditLine: Float
    $interestRate: Float
    $debtAtCreation: Float!
    $user: ID
  ) {
    addDebt(
      name: $name
      category: $category
      currentDebt: $currentDebt
      totalCreditLine: $totalCreditLine
      interestRate: $interestRate
      debtAtCreation: $debtAtCreation
      user: $user
    ) {
      _id
      name
      category
      currentDebt
      totalCreditLine
      interestRate
      createdDate
      debtAtCreation
      user
    }
  }
`;

export const DELETE_USER_DEBT = gql`
  mutation($_id: ID!) {
    deleteUserDebt(_id: $_id) {
      _id
    }
  }
`;

export const DELETE_USER_RECIPE = gql`
  mutation($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      joinDate
      email
      debts {
        _id
        name
      }
      assets {
        _id
        name
      }
    }
  }
`;

export const GET_USER_GOALS = gql`
  query($username: String!) {
    getUserGoals(username: $username) {
      _id
      name
      goalTarget
    }
  }
`;

export const GET_USER_ASSETS = gql`
  query($user: ID!) {
    getUserAssets(user: $user) {
      _id
      name
      category
      currentValue
      interestRate
      quantity
    }
  }
`;

export const GET_USER_DEBTS = gql`
  query($user: ID!) {
    getUserDebts(user: $user) {
      _id
      name
      category
      currentDebt
      totalCreditLine
      interestRate
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
    }
  }
`;

// User Mutations

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
