const User = require("../models/user");

const resolvers = {
  Query: {
    allUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserSchema({
          username,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        return "User created successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return { token, message: "Login successful", tag: true };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
