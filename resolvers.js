const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
      return allRecipes;
    },
    getGoal: async (root, { _id }, { Goal }) => {
      const goal = await Goal.findOne({ _id });
      return goal;
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id });
      return recipe;
    },
    getAsset: async (root, { _id }, { Asset }) => {
      const asset = await Asset.findOne({ _id });
      return asset;
    },
    getDebt: async (root, { _id }, { Debt }) => {
      const debt = await Debt.findOne({ _id });
      return debt;
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      } else {
        const recipes = await Recipe.find().sort({
          likes: "desc",
          createdDate: "desc"
        });
        return recipes;
      }
    },
    getUserRecipes: async (root, { username }, { Recipe }) => {
      const userRecipes = await Recipe.find({ username }).sort({
        createdDate: "desc"
      });
      return userRecipes;
    },
    getUserGoals: async (root, { username }, { Goal }) => {
      const userGoals = await Goal.find({ username }).sort({
        createdDate: "desc"
      });
      return userGoals;
    },
    getUserAssets: async (root, { user }, { Asset }) => {
      const userAssets = await Asset.find({ user }).sort({
        createdDate: "desc"
      });
      return userAssets;
    },
    getUserDebts: async (root, { user }, { Debt }) => {
      const userDebts = await Debt.find({ user }).sort({
        createdDate: "desc"
      });
      return userDebts;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Recipe"
      });
      return user;
    }
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },
    addAsset: async (
      root,
      { name, category, currentValue, interestRate, quantity, user },
      { Asset }
    ) => {
      const newAsset = await new Asset({
        name,
        category,
        currentValue,
        interestRate,
        quantity,
        user
      }).save();
      return newAsset;
    },
    addDebt: async (
      root,
      {
        name,
        category,
        currentDebt,
        totalCreditLine,
        debtAtCreation,
        interestRate,
        user
      },
      { Debt }
    ) => {
      const newDebt = await new Debt({
        name,
        category,
        currentDebt,
        totalCreditLine,
        debtAtCreation,
        interestRate,
        user
      }).save();
      return newDebt;
    },

    addGoal: async (
      root,
      { name, category, username, goalTarget, currentProgress, goalStart },
      { Goal }
    ) => {
      const newGoal = await new Goal({
        name,
        category,
        username,
        goalTarget,
        currentProgress,
        goalStart
      }).save();
      return newGoal;
    },
    likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id },
        { $inc: { likes: 1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return recipe;
    },
    unlikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return recipe;
    },
    deleteUserRecipe: async (root, { _id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndRemove({ _id });
      return recipe;
    },
    deleteUserGoal: async (root, { _id }, { Goal }) => {
      const goal = await Goal.findOneAndRemove({ _id });
      return goal;
    },
    deleteUserAsset: async (root, { _id }, { Asset }) => {
      const asset = await Asset.findOneAndRemove({ _id });
      return asset;
    },
    deleteUserDebt: async (root, { _id }, { Debt }) => {
      const debt = await Debt.findOneAndRemove({ _id });
      return debt;
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid Password");
      }
      return { token: createToken(user, process.env.SECRET, "12hr") };
    },
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "12hr") };
    }
  }
};
