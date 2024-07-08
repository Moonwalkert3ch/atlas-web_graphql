const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require("./schema/schema");

const app = express();

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true, // Enables GraphiQL UI for testing
})
);

app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});
