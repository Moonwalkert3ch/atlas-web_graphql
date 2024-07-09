const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const _ = require("lodash");
const Task = require("./models/task");
const Project =  require("./models/project");

// Dummy data for tasks
/** const tasks = [
    {
        id: '1',
        title: 'Create your first webpage',
        weight: '1',
        description: "Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)",
        projectId: '1',
    },
    {
        id: '2',
        title: 'Structure your webpage',
        weight: '1',
        description: "Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order",
        projectId: '1',
    },
];

// Dummy Data for Projects
const projects = [
    {
        id: '1',
        title: 'Advanced HTML',
        weight: '1',
        description: "Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!",
    },
    {
        id: '2',
        title: 'Bootstrap',
        weight: '1',
        description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.",
    },
];
**/
// Define Task type
const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        project: {
            type: ProjectType,
            // resolve: (parent, args) => {
                // return _.find(projects, { id: parent.projectId });
            resolve: async (parent, args) => {
                return await Project.findById(parent.projectId);
            }
        }
    })
});

// Task 3 Define Project Type using GraphQLID
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            // resolve: (parent, args) => {
                // return _.filter(tasks, { projectId: parent.id });
            resolve: async (parent, args) => {
                return await Task.find({ projectId: parent.id });
            }
        }
    })
});

// Using Mutation to add project and task to the db
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            // resolve(parent, args) {
                // const Project = {
            resolve: async (parent, args) => {
                const project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                // projects.push(Project);
                // return Project;
                return await project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLString) }
            },
            // resolve(parent, args) {
                // const Task = {
            resolve: async (parent, args) => {
                const task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId
                });
                // tasks.push(Task);
                // return Task;
                return await task.save();
            }
        }
    })
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
            // resolve: (parent, args) => {
                // return _.find(tasks, { id: args.id });
            resolve: async (parent, args) => {
                return await Task.findById(args.id);
            },
        },
        // Root Query Type
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
            },
            // resolve: (parent, args) => {
                // return _.find(projects, { id: args.id });
            resolve: async (parent, args) => {
                return await Project.findById(args.id);
            },
        },
        // GraphQLList Root Query Type
        tasks: {
            type: new GraphQLList(TaskType),
            // resolve: () => {
                // return tasks;
            resolve: async () => {
                return await Task.find({});
            }
        },

        projects: {
            type: new GraphQLList(ProjectType),
            // resolve: () => {
                // return projects;
            resolve: async () => {
                return await Project.find({});
            }
        }
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;
