import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Cat {
    @PrimaryKey({autoincrement: true  })
    _id: number

    @Property({hidden: true})
    hiddenField = Date.now()

    @Property({ persist: false })
    count?: number;
}