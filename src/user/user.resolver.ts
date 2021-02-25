import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './user-inputs.dto';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './user.guard';
import { CurrentUser } from './user.docrator';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly us: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.us.createUser(createUserInput);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    try {
      return await this.us.login({ email, password });
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async findAllUsers() {
    try {
      return await this.us.findAll();
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async UpdateUserInput(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      return await this.us.updateUser(user._id, updateUserInput);
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async UpdateUserPass(
    @CurrentUser() user: User,
    @Args('currPass') currPass: string,
    @Args('newPass') newPass: string,
  ) {
    try {
      return await this.us.updatePassword(user._id, currPass, newPass);
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return await this.us.findOne(_id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async removeUser(@Args('_id') _id: string) {
    try {
      return await this.us.remove(_id);
    } catch (err) {
      console.error(err);
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async CurrentUser(@CurrentUser() user: User) {
    try {
      return await this.us.findOne(user._id);
    } catch (err) {
      console.error(err);
    }
  }
}
