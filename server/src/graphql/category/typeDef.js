const categoryTypeDefs = `

  scalar Upload

  type CategoryImage {
    url: String
    altText: String
    type: String
  }

  type Category {
    _id: ID!
    name: String!
    slug: String!
    description: String!
    isActive: Boolean!
    images: [CategoryImage!]!
    createdAt: String!
    updatedAt: String!
  }

  input CategoryImageInput {
    url: String
    file:  Upload
    altText: String
    type: String
  }

  input CreateCategoryInput {
    name: String
    slug: String
    description: String
    isActive: Boolean
    images: [CategoryImageInput]

  }

  input UpdateCategoryInput {
    name: String
    slug: String
    description: String
    isActive: Boolean
    images: [CategoryImageInput]
  }

  type CategoryResponse {
  success: Boolean
  message: String
  data: Category
}

type CategoryListResponse {
  success: Boolean
  message: String!
  data: [Category!]
}


  type Mutation {
  createCategory( input: CreateCategoryInput): CategoryResponse!
  updateCategory(id: ID!, input: UpdateCategoryInput!): CategoryResponse!
  deleteCategory(id: ID!): CategoryResponse!
}

type Query {
  getAllCategories: CategoryListResponse!
  getCategoryById(id: ID!): CategoryResponse!
}
`;

export default categoryTypeDefs;
