import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import { join } from 'path';
import {MikroOrmCoreModule} from "@mikro-orm/nestjs/mikro-orm-core.module";
import config from './mikro-orm.config';
import {ConfigModule, ConfigService} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmCoreModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...config,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      playground: false,
    }),
    CatsModule],
})
export class AppModule {}