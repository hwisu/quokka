import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Loan {
    @PrimaryKey()
    id!: number;

    @Property()
    bookId!: number;

    @Property()
    borrowerId!: number;

    @Property()
    loanDate: Date = new Date();

    @Property({ nullable: true })
    dueDate?: Date;

    @Property({ nullable: true })
    returnDate?: Date;

    @Property({ nullable: true })
    reservedById?: number;

    @Property()
    extensionCount: number = 0;

    @Property()
    status: LoanStatus = LoanStatus.ACTIVE;

    constructor(bookId: number, borrowerId: number) {
        this.bookId = bookId;
        this.borrowerId = borrowerId;
        this.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14일 후 반납 예정일
    }

    returnBook(): void {
        if (this.status !== LoanStatus.ACTIVE) {
            throw new Error('대출 상태가 이미 반납되었습니다.');
        }
        this.returnDate = new Date();
        this.status = LoanStatus.RETURNED;
    }

    extendLoan(days: number): void {
        if (this.returnDate) {
            throw new Error('이미 반납된 대출은 연장할 수 없습니다.');
        }
        this.dueDate = new Date(this.dueDate!.getTime() + days * 24 * 60 * 60 * 1000);
        this.extensionCount += 1;
    }

    reserveBook(memberId: number): void {
        if (this.status !== LoanStatus.ACTIVE) {
            throw new Error('대출 중이 아닙니다.');
        }
        this.reservedById = memberId;
    }
}

export enum LoanStatus {
    ACTIVE = 'active',
    RETURNED = 'returned',
    OVERDUE = 'overdue',
}
