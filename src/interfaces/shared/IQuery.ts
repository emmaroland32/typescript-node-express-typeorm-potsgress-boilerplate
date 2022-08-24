import { AuthorEntity } from "../../entity/Author";

export interface IQuery {
  search?: string;
  date?: string;
  params?: string;
}

export interface IBookQuery {
  title?: string;
  author?: AuthorEntity;
}
