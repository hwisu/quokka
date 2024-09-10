// src/library-member/library-member.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {LibraryMember} from "./library-member.entity";
import {LibraryMemberResolver} from "./library-member.resolver";
import {LibraryMemberService} from "./library-member.service";

@Module({
    imports: [MikroOrmModule.forFeature([LibraryMember])],
    providers: [LibraryMemberService, LibraryMemberResolver],
    exports: [LibraryMemberService],
})
export class LibraryMemberModule {}
