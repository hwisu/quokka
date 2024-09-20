import { Injectable, NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublisherService {
    constructor(private readonly orm: MikroORM) {}

    // 모든 출판사 조회
    async findAll(): Promise<Publisher[]> {
        const em = this.orm.em.fork();
        return await em.find(Publisher, {});
    }

    // 특정 출판사 조회
    async findOne(publisherId: number): Promise<Publisher> {
        const em = this.orm.em.fork();
        const publisher = await em.findOne(Publisher, publisherId);
        if (!publisher) {
            throw new NotFoundException('출판사를 찾을 수 없습니다.');
        }
        return publisher;
    }

    // 새 출판사 추가
    async addPublisher(name: string, registrationNumber: string, establishedDate: Date): Promise<Publisher> {
        const em = this.orm.em.fork();

        const publisher = new Publisher(name, registrationNumber, establishedDate);
        await em.persistAndFlush(publisher);
        return publisher;
    }
}
