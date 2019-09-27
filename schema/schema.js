const graphql = require("graphql");
const _ = require("lodash");
// var _ = require("underscore");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// dummy data
var movies = [
  { title: "harry potter", genre: "fantasy", id: "1", actorId: "2" },
  { title: "kamen riden", genre: "action", id: "2", actorId: "1" },
  { title: "naruto", genre: "fantasy", id: "3", actorId: "3" }
];

var actors = [
  {
    name: "John Black",
    gender: "male",
    id: "1"
  },
  {
    name: "Jennyfer",
    gender: "female",
    id: "2"
  },
  {
    name: "Del Luna",
    gender: "female",
    id: "3"
  }
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    actor: {
      type: ActorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(actors, { id: parent.actorId });
      }
    }
  })
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/ another source
        console.log(typeof args.id);
        return _.find(movies, { id: args.id });
      }
    },
    actors: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(actors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
