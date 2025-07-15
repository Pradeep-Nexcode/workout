import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import categoryTypeDefs from "./category/typeDef.js";
import categoryResolvers from "./category/resolver.js";
import exerciseTypeDefs from "./exercise/typeDef.js";
import exerciseResolvers from "./exercise/resolver.js";
import muscleGroupTypeDefs from "./muscleGroup/typeDef.js";
import muscleGroupResolvers from "./muscleGroup/resolver.js";
import workoutPlanTypeDefs from "./workoutPlan/typeDef.js";
import workoutPlanResolvers from "./workoutPlan/resolver.js";


const typeDefs = mergeTypeDefs([
  // import typeDefs
  categoryTypeDefs,
  exerciseTypeDefs,
  muscleGroupTypeDefs,
  workoutPlanTypeDefs
]);

const resolvers = mergeResolvers([
  // import resolvers
  categoryResolvers,
  exerciseResolvers,    
  muscleGroupResolvers,
  workoutPlanResolvers
]);

export { typeDefs, resolvers };
