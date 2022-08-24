import { Column, Entity, OneToMany, Unique } from "typeorm";

import { BookEntity } from "./Book";
import { CoreEntity } from "./common/CoreEntity";

@Entity("author")
export class AuthorEntity extends CoreEntity {
  @Column({
    nullable: true,
  })
  title?: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({
    nullable: true,
  })
  middlename?: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => BookEntity, (book) => book.author, { nullable: true })
  books?: BookEntity[];
}
