import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cat } from './cat.entity'
import {CatsResolver} from "./cats.resolver";

@Module({
  imports: [MikroOrmModule.forFeature([Cat])],
  providers: [CatsService , CatsResolver],
  exports: [CatsService]
})
export class CatsModule {}