import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Book {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    author!: string;

    @Property()
    publishedDate!: Date;

    constructor(title: string, author: string, publishedDate: Date) {
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
    }
}
