const axios = require("axios");
const Profile = require("./models/Profile");
const User = require("./models/User");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    password: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: () => ({
    user: { type: LittleUser },
    company: { type: GraphQLString },
    website: { type: GraphQLString },
    bio: { type: GraphQLString },
    status: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    social: { type: SocialType },
    githubusername: { type: GraphQLString },
    experience: { type: new GraphQLList(ExperienceType) },
  }),
});

const SocialType = new GraphQLObjectType({
  name: "Social",
  fields: () => ({
    youtube: { type: GraphQLString },
    facebook: { type: GraphQLString },
    twitter: { type: GraphQLString },
    linkedin: { type: GraphQLString },
    instagram: { type: GraphQLString },
  }),
});

const LittleUser = new GraphQLObjectType({
  name: "LUser",
  fields: () => ({
    name: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
});

const ExperienceType = new GraphQLObjectType({
  name: "Experience",
  fields: () => ({
    title: { type: GraphQLString },
    company: { type: GraphQLString },
    location: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find().then((res) => res);
      },
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve(parent, args) {
        return Profile.find()
          .populate("user", ["name", "avatar"])
          .then((res) => res);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
