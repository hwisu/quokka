import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoanService } from './loan.service';
import {Loan} from "./loan.entity";

@Resolver('Loan')
export class LoanResolver {
    constructor(private readonly loanService: LoanService) {}

    @Query(() => Loan)
    async getLoanById(@Args('id') id: number): Promise<Loan> {
        const loan = await this.loanService.findOne(id);
        if (!loan) {
            throw new Error('대출 기록을 찾을 수 없습니다.');
        }
        return loan;
    }

    @Mutation(() => Loan)
    async createLoan(
        @Args('bookId') bookId: number,
        @Args('memberId') memberId: number,
    ): Promise<Loan> {
        return await this.loanService.createLoan(bookId, memberId);
    }

    @Mutation(() => Loan)
    async returnLoan(@Args('loanId') loanId: number): Promise<Loan> {
        return await this.loanService.returnLoan(loanId);
    }

    @Mutation(() => Loan)
    async extendLoan(
        @Args('loanId') loanId: number,
        @Args('days') days: number,
    ): Promise<Loan> {
        return await this.loanService.extendLoan(loanId, days);
    }

    @Mutation(() => Loan)
    async reserveBook(
        @Args('loanId') loanId: number,
        @Args('memberId') memberId: number,
    ): Promise<Loan> {
        return await this.loanService.reserveBook(loanId, memberId);
    }
}
