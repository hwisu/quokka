import { Injectable, NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import {LibraryMember} from "./library-member.entity";

@Injectable()
export class LibraryMemberService {
    constructor(private readonly orm: MikroORM) {}

    // 모든 회원 조회
    async findAll(): Promise<LibraryMember[]> {
        const em = this.orm.em.fork();
        return await em.find(LibraryMember, {});
    }

    // 특정 회원 조회
    async findOne(memberId: number): Promise<LibraryMember> {
        const em = this.orm.em.fork();
        const member = await em.findOne(LibraryMember, memberId);

        if (!member) {
            throw new NotFoundException(`ID ${memberId}에 해당하는 회원을 찾을 수 없습니다.`);
        }

        return member;
    }

    // 회원 등록
    async createMember(name: string): Promise<LibraryMember> {
        const em = this.orm.em.fork();
        const member = new LibraryMember();
        member.name = name;
        await em.persistAndFlush(member);
        return member;
    }
}
