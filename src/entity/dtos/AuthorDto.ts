import { AuthorEntity } from "../Author";

export interface CreateAuthorDto {
  title?: string;
  firstname: string;
  lastname: string;
  middlename?: string;
  email: string;
}

export interface UpdateAuthorDto extends Partial<AuthorEntity> {}

export interface IAuthorResponse {
  statusCode: number;
  hasError: boolean;
  message: string;
  data?: AuthorEntity | AuthorEntity[] | null;
}
