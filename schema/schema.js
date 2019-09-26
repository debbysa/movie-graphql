const graphql = require("graphql");
const _ = require("lodash");
// var _ = require("underscore");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var movies = [
  { title: "harry potter", genre: "fantasy", id: "1" },
  { title: "kamen riden", genre: "action", id: "2" },
  { title: "naruto", genre: "fantasy", id: "3" }
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //code to get data from db/ another source
        return _.find(movies, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
