import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { AuthorEntity } from "./Author";
import { CoreEntity } from "./common/CoreEntity";
import { ILanguage } from "../interfaces/shared/ILanguage";

@Entity("book")
export class BookEntity extends CoreEntity {
  @Column()
  bookTitle: string;

  @Column({ type: "text" })
  bookDescription: string;

  @Column()
  bookTotalPages: number;

  @Column({
    type: "enum",
    enum: ILanguage,
    default: ILanguage.ENGLISH,
  })
  bookLanguage?: ILanguage;

  @Column({
    type: "decimal",
  })
  bookPrice: number;

  @Column()
  authorId: string;
  @ManyToOne(() => AuthorEntity, (author) => author.books)
  @JoinColumn({ name: "authorId" })
  author: AuthorEntity;
}
