const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const uri = 'mongodb://atlas-sql-667d7f97689b541727735f00-bzpst.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin';

const app = express();

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true, // Enables GraphiQL UI for testing
})
);

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
