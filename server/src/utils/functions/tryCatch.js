// const tryCatch = async (resolverFn) => {
//   try {
//     return await resolverFn();
//   } catch (error) {
//     console.error("❌ GraphQL Error:", error.message);

//     return {
//       success: false,
//       message: error.message || "Something went wrong",
//       data: null,
//     };
//   }
// };

// export default tryCatch;

const tryCatch = (resolverFn) => {
  return async (parent, args, context, info) => {
    try {
      return await resolverFn(parent, args, context, info);
    } catch (error) {
      console.error("❌ GraphQL Error:", error.message);

      return {
        success: false,
        message: error.message || "Something went wrong",
        data: null,
      };
    }
  };
};

export default tryCatch;
