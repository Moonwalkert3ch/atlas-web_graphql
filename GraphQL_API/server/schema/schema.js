const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

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

module.exports = TaskType;
