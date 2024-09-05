
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateCatDto {
    name: string;
    age: number;
    breed: string;
}

export interface UpdateCatDto {
    name: string;
    age: number;
    breed: string;
}

export interface IQuery {
    cat(id: number): Nullable<Cat> | Promise<Nullable<Cat>>;
}

export interface IMutation {
    createCat(createCatDto: CreateCatDto): Nullable<string> | Promise<Nullable<string>>;
    updateCat(id: number, updateCatDto: UpdateCatDto): Nullable<string> | Promise<Nullable<string>>;
}

export interface Cat {
    name: string;
    age: number;
    breed: string;
}

type Nullable<T> = T | null;
