import { ConfigService } from '@nestjs/config';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import {SqliteDriver} from "@mikro-orm/sqlite";

const config = (configService: ConfigService): Options => ({
    driver: SqliteDriver,
    dbName: '../not-a-postgres.sqlite3', // Path to the SQLite file
    entities: ['./dist/**/*.entity.js'], // Compiled JS files for production
    entitiesTs: ['./src/**/*.entity.ts'], // TypeScript files for development
    migrations: {
        path: '../dist/migrations', // Path to your migration files
        pathTs: './migrations', // Path to your TypeScript migration files
    },
    metadataProvider: TsMorphMetadataProvider, // Enables reflection for entity metadata
});

export default config;
