const graphql = require("graphql");
const _ = require("lodash");
// var _ = require("underscore");
const Movie = require("../models/movie");
const Actor = require("../models/actor");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// var movies = [
//   { title: "harry potter", genre: "fantasy", id: "1", actorId: "2" },
//   { title: "kamen riden", genre: "action", id: "2", actorId: "1" },
//   { title: "naruto", genre: "fantasy", id: "3", actorId: "3" },
//   { title: "larva", genre: "animation", id: "4", actorId: "1" },
//   { title: "shaun the sheep", genre: "animation", id: "5", actorId: "1" },
//   { title: "inuyasha", genre: "anime", id: "6", actorId: "2" },
//   { title: "timmy time", genre: "animation", id: "7", actorId: "3" },
//   { title: "spongebob", genre: "animation", id: "8", actorId: "3" }
// ];

// var actors = [
//   {
//     name: "John Black",
//     gender: "male",
//     id: "1"
//   },
//   {
//     name: "Jennyfer",
//     gender: "female",
//     id: "2"
//   },
//   {
//     name: "Del Luna",
//     gender: "female",
//     id: "3"
//   }
// ];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    actor: {
      type: ActorType,
      resolve(parent, args) {
        // console.log(parent);
        // return _.find(actors, { id: parent.actorId });
        return Actor.findById(parent.actorId);
      }
    }
  })
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return _.filter(movies, { actorId: parent.id });
        return Movie.find({ actorId: parent.id });
      }
    }
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
        // console.log(typeof args.id);
        // return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      }
    },
    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(actors, { id: args.id });
        return Actor.findById(args.id);
      }
    },
    // all movie
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movie.find({});
      }
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        // return actors;
        return Actor.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addActor: {
      type: ActorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let actor = new Actor({
          name: args.name,
          gender: args.gender
        });
        return actor.save();
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        actorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let movie = new Movie({
          title: args.title,
          genre: args.genre,
          actorId: args.actorId
        });
        return movie.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
