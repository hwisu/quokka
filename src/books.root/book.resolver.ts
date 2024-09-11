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
        return this.bookService.findOne(id);
    }

    // ISBN으로 책 조회
    @Query(() => Book)
    async getBookByISBN(@Args('isbn') isbn: string): Promise<Book> {
        return this.bookService.findByISBN(isbn);
    }

    // 새 책 추가
    @Mutation(() => Book)
    async addBook(
        @Args('title') title: string,
        @Args('authors') authors: string[],
        @Args('publishedDate') publishedDate: string,
        @Args('isbn') isbn: string,
        @Args('publisherId') publisherId: number,
        @Args('translator') translator?: string,
        @Args('editor') editor?: string,
        @Args('reviewer') reviewer?: string[],
    ): Promise<Book> {
        const date = new Date(publishedDate);
        return this.bookService.addBook(title, authors, date, isbn, publisherId, translator, editor, reviewer);
    }

    // 책 삭제
    @Mutation(() => Boolean)
    async removeBook(@Args('id') id: number): Promise<boolean> {
        await this.bookService.removeBook(id);
        return true;
    }
}
