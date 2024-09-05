import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'not-a-postgres.sqlite3',
      driver: SqliteDriver,
      autoLoadEntities: true,
    }),
    CatsModule],
})
export class AppModule {}