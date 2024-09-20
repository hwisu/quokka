import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Publisher } from './publisher.entity';

@Entity()
export class Book {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    authors!: string[];  // 여러 명의 저자를 허용

    @Property()
    publishedDate!: Date;

    @Property({ unique: true })
    isbn!: string;  // ISBN을 기준으로 관리

    @Property({ nullable: true })
    translator?: string;  // 번역자 정보 (선택적)

    @Property({ nullable: true })
    editor?: string;  // 감수자 정보 (선택적)

    @Property({ nullable: true })
    reviewer?: string[];  // 여러 명의 리뷰어 (선택적)

    @ManyToOne(() => Publisher)
    publisher!: Publisher;  // 출판사 관계

    constructor(
        title: string,
        authors: string[],
        publishedDate: Date,
        isbn: string,
        publisher: Publisher,
        translator?: string,
        editor?: string,
        reviewer?: string[],
    ) {
        this.title = title;
        this.authors = authors;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.publisher = publisher;
        this.translator = translator;
        this.editor = editor;
        this.reviewer = reviewer;
    }
}
