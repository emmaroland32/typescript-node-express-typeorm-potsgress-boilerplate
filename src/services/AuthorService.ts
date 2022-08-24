import {
  CreateAuthorDto,
  IAuthorResponse,
  UpdateAuthorDto,
} from "../entity/dtos/AuthorDto";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import AppResponse from "../utils/helpers/AppResponse";
import { AuthorEntity } from "../entity/Author";
import { IAuthorService } from "../interfaces/IAuthor";
import authorRepository from "../repository/AuthorRepository";
import getErrorMessage from "../utils/error/errorMessage";

class AuthorService implements IAuthorService {
  async findAuthors(): Promise<IAuthorResponse> {
    try {
      const authors = await authorRepository.findAuthors();
      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, authors);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async createAuthor(
    createAuthorDto: CreateAuthorDto
  ): Promise<IAuthorResponse | AuthorEntity> {
    try {
      const authorExistByEmail = await authorRepository.findAuthorByEmail(
        createAuthorDto.email
      );

      if (authorExistByEmail) {
        return new AppResponse("Author already exist", StatusCodes.FORBIDDEN);
      }
      const author = await authorRepository.createAuthor(createAuthorDto);
      return new AppResponse(
        "Author created successfully",
        StatusCodes.OK,
        author
      );
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto
  ): Promise<IAuthorResponse> {
    try {
      let author = await authorRepository.findAuthorById(id);

      if (!author) {
        return new AppResponse(
          `Author with id ${id} does not exist`,
          StatusCodes.NOT_FOUND
        );
      }

      const newAuthor = await authorRepository.updateAuthor(
        id,
        updateAuthorDto
      );

      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, newAuthor);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async findAuthor(id: string): Promise<IAuthorResponse> {
    try {
      const author = await authorRepository.findAuthorById(id);
      if (!author) {
        return new AppResponse("Author Not found", StatusCodes.OK);
      }
      return new AppResponse(ReasonPhrases.OK, StatusCodes.OK, author);
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
  async deleteAuthor(id: string): Promise<IAuthorResponse> {
    try {
      let author = await authorRepository.findAuthorById(id);
      if (!author) {
        return new AppResponse(
          `Author with id: ${id} not found`,
          StatusCodes.NOT_FOUND
        );
      }
      await authorRepository.deleteAuthor(id);

      return new AppResponse(
        `Author with id: ${id} successfully deleted`,
        StatusCodes.OK
      );
    } catch (err) {
      return new AppResponse(getErrorMessage(err), StatusCodes.BAD_REQUEST);
    }
  }
}

export default new AuthorService();
