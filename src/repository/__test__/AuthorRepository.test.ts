import AuthorRepository from "../AuthorRepository";
import { StatusCodes } from "http-status-codes";
import { TestDBHelper } from "../../config/database/test.tyeorm";
import { AuthorEntity } from "../../entity/Author";

beforeAll(async () => {
  await TestDBHelper.instance.setupTestDB();
});

describe("Authors Repository Tests", () => {
  it("should create a new Author", async () => {
    const author = await AuthorRepository.createAuthor({
      email: "iyandasegunemmanuel@gmail.com",
      lastname: "Iyanda",
      firstname: "Segun",
    });
    expect(author).toEqual(Promise<AuthorEntity>);
  }),
    it("should return list of Authors", async () => {
      const authors = await AuthorRepository.findAuthors();
      expect(authors.length).toBeGreaterThanOrEqual(0);
    });
});

afterAll(() => {
  TestDBHelper.instance.teardownTestDB();
});
