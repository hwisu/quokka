import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Book } from './book.entity';
import { Publisher } from './publisher.entity';

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

    // ISBN으로 책 조회
    async findByISBN(isbn: string): Promise<Book> {
        const em = this.orm.em.fork();
        const book = await em.findOne(Book, { isbn });
        if (!book) {
            throw new NotFoundException('ISBN에 해당하는 책을 찾을 수 없습니다.');
        }
        return book;
    }

    // 새 책 추가 (저자 배열 및 출판사 객체 추가)
    async addBook(
        title: string,
        authors: string[],
        publishedDate: Date,
        isbn: string,
        publisherId: number,
        translator?: string,
        editor?: string,
        reviewer?: string[],
    ): Promise<Book> {
        const em = this.orm.em.fork();

        // ISBN 중복 확인
        const existingBook = await em.findOne(Book, { isbn });
        if (existingBook) {
            throw new BadRequestException('같은 ISBN의 책이 이미 존재합니다.');
        }

        // 출판사 확인
        const publisher = await em.findOne(Publisher, publisherId);
        if (!publisher) {
            throw new NotFoundException('출판사를 찾을 수 없습니다.');
        }

        const book = new Book(title, authors, publishedDate, isbn, publisher, translator, editor, reviewer);
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
