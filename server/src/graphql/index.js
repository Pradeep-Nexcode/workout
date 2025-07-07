import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import categoryTypeDefs from "./category/typeDef.js"; 
import categoryResolvers from "./category/resolver.js";

const typeDefs = mergeTypeDefs([
    // import typeDefs
    categoryTypeDefs
]);

const resolvers = mergeResolvers([
    // import resolvers
    categoryResolvers
]);

export { typeDefs, resolvers };
