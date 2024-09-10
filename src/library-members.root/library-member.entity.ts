import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class LibraryMember {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    membershipDate: Date = new Date();
}
