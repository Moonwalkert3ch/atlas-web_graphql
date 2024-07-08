## GRAPHQL  

GraphQL services can be written in any language. Since we can’t rely on a specific programming language syntax, like JavaScript, to talk about GraphQL schemas, we’ll define our own simple language. We’ll use the “GraphQL schema language” - it’s similar to the query language, and allows us to talk about GraphQL schemas in a language-agnostic way.

Object types and fields
The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has.