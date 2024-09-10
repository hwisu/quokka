import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LibraryMemberService } from './library-member.service';
import {LibraryMember} from "./library-member.entity";

@Resolver('LibraryMember')
export class LibraryMemberResolver {
    constructor(private readonly memberService: LibraryMemberService) {}

    // 모든 회원 조회
    @Query(() => [LibraryMember])
    async getAllMembers(): Promise<LibraryMember[]> {
        return await this.memberService.findAll();
    }

    // 특정 회원 조회
    @Query(() => LibraryMember)
    async getMemberById(@Args('id') id: number): Promise<LibraryMember> {
        return await this.memberService.findOne(id);
    }

    // 회원 등록
    @Mutation(() => LibraryMember)
    async createMember(@Args('name') name: string): Promise<LibraryMember> {
        return await this.memberService.createMember(name);
    }
}
