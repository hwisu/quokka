import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Publisher {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;  // 출판사 이름

    @Property()
    registrationNumber!: string;  // 법인 등록 번호

    @Property()
    establishedDate!: Date;  // 설립일

    constructor(name: string, registrationNumber: string, establishedDate: Date) {
        this.name = name;
        this.registrationNumber = registrationNumber;
        this.establishedDate = establishedDate;
    }
}
