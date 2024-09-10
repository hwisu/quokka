import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    // 모든 책 조회
    @Query(() => [Book])
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    // 특정 ID의 책 조회
    @Query(() => Book)
    async getBookById(@Args('id') id: number): Promise<Book> {
        const book = await this.bookService.findOne(id);
        if (!book) {
            throw new Error('책을 찾을 수 없습니다.');
        }
        return book;
    }

    // 새 책 추가
    @Mutation(() => Book)
    async addBook(
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('publishedDate') publishedDate: string,
    ): Promise<Book> {
        const date = new Date(publishedDate); // String to Date 변환
        return this.bookService.addBook(title, author, date);
    }

    // 책 삭제
    @Mutation(() => Boolean)
    async removeBook(@Args('id') id: number): Promise<boolean> {
        await this.bookService.removeBook(id);
        return true;
    }
}
