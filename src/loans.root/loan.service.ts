import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Loan, LoanStatus } from './loan.entity';
import { LibraryMember } from '../library-members.root/library-member.entity';

@Injectable()
export class LoanService {
    constructor(private readonly orm: MikroORM) {}

    // Loan을 ID로 조회
    async findOne(loanId: number): Promise<Loan> {
        const em = this.orm.em.fork();
        const loan = await em.findOne(Loan, loanId);

        if (!loan) {
            throw new NotFoundException(`ID ${loanId}에 해당하는 대출 기록을 찾을 수 없습니다.`);
        }

        return loan;
    }

    // 대출 생성 (ID로 처리)
    async createLoan(bookId: number, memberId: number): Promise<Loan> {
        const em = this.orm.em.fork();

        // 이미 해당 bookId로 활성화된 대출(Active 상태)이 있는지 확인
        const activeLoan = await em.findOne(Loan, { bookId, status: LoanStatus.ACTIVE });
        if (activeLoan) {
            throw new BadRequestException('해당 책은 이미 대출 중입니다.');
        }

        // LibraryMember가 존재하는지 확인
        const member = await em.findOne(LibraryMember, memberId);
        if (!member) {
            throw new NotFoundException('회원이 존재하지 않습니다.');
        }

        // 대출 생성
        const loan = new Loan(bookId, memberId);
        await em.persistAndFlush(loan);
        return loan;
    }

    // 대출 반납
    async returnLoan(loanId: number): Promise<Loan> {
        const em = this.orm.em.fork();
        const loan = await em.findOne(Loan, loanId);

        if (!loan) {
            throw new NotFoundException('대출 기록을 찾을 수 없습니다.');
        }

        loan.returnBook();
        await em.flush();
        return loan; // 반환
    }

    // 대출 연장
    async extendLoan(loanId: number, days: number): Promise<Loan> {
        const em = this.orm.em.fork();
        const loan = await em.findOne(Loan, loanId);

        if (!loan) {
            throw new NotFoundException('대출 기록을 찾을 수 없습니다.');
        }

        loan.extendLoan(days);
        await em.flush();
        return loan; // 반환
    }

    // 책 예약 (ID로 처리)
    async reserveBook(loanId: number, memberId: number): Promise<Loan> {
        const em = this.orm.em.fork();
        const loan = await em.findOne(Loan, loanId);
        const member = await em.findOne(LibraryMember, memberId);

        if (!loan || !member) {
            throw new NotFoundException('대출 기록 또는 회원을 찾을 수 없습니다.');
        }

        loan.reserveBook(memberId); // memberId로 예약
        await em.flush();
        return loan; // 반환
    }
}
