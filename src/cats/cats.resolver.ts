import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {CreateCatDto, UpdateCatDto} from "../graphql";

@Resolver()
  export class CatsResolver {
    @Mutation()
    async  createCat(@Args('createCatDto') createCatDto: CreateCatDto) {
      return 'This action adds a new cat';
    }

    @Mutation()
    async updateCat(@Args('id') id: number, @Args('updateCatDto') updateCatDto: UpdateCatDto) {
      return `This action updates a #${id} cat`;
    }
  
    @Query()
    async cat(@Args('id') id: number) {
      return `This action returns a #${id} cat`;
    }
  }