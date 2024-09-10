import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { LoanService } from './loan.service';
import { LoanResolver } from './loan.resolver';
import {Loan} from "./loan.entity";
import {Book} from "../books.root/book.entity";
import {LibraryMember} from "../library-members.root/library-member.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Loan, Book, LibraryMember])],
    providers: [LoanService, LoanResolver],
    exports: [LoanService],
})
export class LoanModule {}
