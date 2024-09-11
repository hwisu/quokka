
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum LoanStatus {
    ACTIVE = "ACTIVE",
    RETURNED = "RETURNED",
    OVERDUE = "OVERDUE"
}

export enum BookStatus {
    AVAILABLE = "AVAILABLE",
    BORROWED = "BORROWED",
    RESERVED = "RESERVED"
}

export interface Publisher {
    id: string;
    name: string;
    registrationNumber: string;
    establishedDate: string;
}

export interface Book {
    id: string;
    title: string;
    authors: string[];
    publishedDate: string;
    isbn: string;
    translator?: Nullable<string>;
    editor?: Nullable<string>;
    reviewer?: Nullable<string[]>;
    publisher: Publisher;
    status: BookStatus;
}

export interface IQuery {
    getAllBooks(): Book[] | Promise<Book[]>;
    getBookById(id: string): Book | Promise<Book>;
    getBookByISBN(isbn: string): Book | Promise<Book>;
    getAllMembers(): LibraryMember[] | Promise<LibraryMember[]>;
    getMemberById(id: string): LibraryMember | Promise<LibraryMember>;
    getMemberLoans(id: string): Loan[] | Promise<Loan[]>;
    getLoanById(id: string): Nullable<Loan> | Promise<Nullable<Loan>>;
}

export interface IMutation {
    addBook(title: string, authors: string[], publishedDate: string, isbn: string, publisherId: string, translator?: Nullable<string>, editor?: Nullable<string>, reviewer?: Nullable<string[]>): Book | Promise<Book>;
    removeBook(id: string): boolean | Promise<boolean>;
    createMember(name: string): LibraryMember | Promise<LibraryMember>;
    createLoan(bookId: string, memberId: string): Nullable<Loan> | Promise<Nullable<Loan>>;
    returnLoan(loanId: string): Nullable<Loan> | Promise<Nullable<Loan>>;
    extendLoan(loanId: string, days: number): Nullable<Loan> | Promise<Nullable<Loan>>;
    reserveBook(loanId: string, memberId: string): Nullable<Loan> | Promise<Nullable<Loan>>;
}

export interface LibraryMember {
    id: string;
    name: string;
    membershipDate: string;
    loanIds: string[];
}

export interface Loan {
    id: string;
    book: Book;
    borrower: LibraryMember;
    loanDate: string;
    dueDate?: Nullable<string>;
    returnDate?: Nullable<string>;
    status: LoanStatus;
    extensionCount: number;
    reservedBy?: Nullable<LibraryMember>;
}

type Nullable<T> = T | null;
