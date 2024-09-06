import {Entity, ManyToOne, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Cat} from "../cats/cat.entity";

@Entity()
export class Rat {
    @PrimaryKey({autoincrement: true  })
    _id: number

    @ManyToOne(() => Cat)
    killedBy: Cat;

    @Property()
    createdAt = new Date();
}