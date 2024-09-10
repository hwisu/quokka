import { Injectable, NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Book } from './book.entity';

@Injectable()
export class BookService {
    constructor(private readonly orm: MikroORM) {}

    // 모든 책 조회
    async findAll(): Promise<Book[]> {
        const em = this.orm.em.fork();
        return await em.find(Book, {});
    }

    // 특정 ID의 책 조회
    async findOne(bookId: number): Promise<Book> {
        const em = this.orm.em.fork();
        const book = await em.findOne(Book, bookId);
        if (!book) {
            throw new NotFoundException('책을 찾을 수 없습니다.');
        }
        return book;
    }

    // 새 책 추가
    async addBook(title: string, author: string, publishedDate: Date): Promise<Book> {
        const em = this.orm.em.fork();
        const book = new Book(title, author, publishedDate);
        await em.persistAndFlush(book);
        return book;
    }

    // 책 삭제
    async removeBook(bookId: number): Promise<void> {
        const em = this.orm.em.fork();
        const book = await em.findOne(Book, bookId);
        if (!book) {
            throw new NotFoundException('책을 찾을 수 없습니다.');
        }
        await em.removeAndFlush(book);
    }
}
