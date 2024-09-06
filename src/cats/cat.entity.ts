import {Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {Rat} from "../rats/rat.entity";

@Entity()
export class Cat {
    @PrimaryKey({autoincrement: true  })
    _id: number

    @Property()
    createdAt = new Date();

    @OneToMany(() => Rat, (rat) => rat.killedBy)
    rats: Rat[] = [];

    @Property({ persist: false })
    count?: number;
}