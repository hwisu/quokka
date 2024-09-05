import { IsInt, IsOptional, IsString } from 'class-validator';

export class ListAllEntitiesQuery {
  @IsInt()
  @IsOptional()
  readonly limit?: number;

  @IsInt()
  @IsOptional()
  readonly offset?: number;

  @IsString()
  @IsOptional()
  readonly breed?: string; // Optionally filter by breed
}
