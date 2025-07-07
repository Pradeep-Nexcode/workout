import request from "supertest";
import app from "../src/app.js"; // make sure this exports your express app
import { connectTestDB, disconnectTestDB } from "./utils/setupTestDB.js";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("Category API", () => {
  it("should create a new category", async () => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            createCategory(input: {
              name: "Test Category",
              slug: "test-category",
              description: "Test description"
            }) {
              success
              message
              data {
                _id
                name
              }
            }
          }
        `,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.createCategory.success).toBe(true);
    expect(response.body.data.createCategory.data.name).toBe("Test Category");
  });
});
