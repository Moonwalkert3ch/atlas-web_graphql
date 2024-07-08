const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require("graphql");

// Define Task type
const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
    },
});

// Define the Root Query type

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        task: {
            type: TaskType,
            // 'args' describes the arguments the task query accepts
            args: {
                id: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                return {
                    id: args.id,
                    title: "",
                    weight: 0,
                    description: "",
                };
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
});

module.exports = schema;
