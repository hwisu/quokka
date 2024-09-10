import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import {Book} from "./book.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Book])],
    providers: [BookService, BookResolver],
})
export class BookModule {}
