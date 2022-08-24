import { BookEntity } from "../Book";
import { ILanguage } from "../../interfaces/shared/ILanguage";

export interface CreateBookDto {
  bookTitle: string;
  bookDescription: string;
  bookTotalPages: number;
  bookLanguage?: ILanguage;
  bookPrice: number;
}

export interface UpdateBookDto extends Partial<BookEntity> {}

export interface IBookResponse {
  statusCode: number;
  hasError: boolean;
  message: string;
  data?: BookEntity | BookEntity[] | null;
}
