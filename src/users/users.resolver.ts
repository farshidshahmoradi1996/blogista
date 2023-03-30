import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { LoginUserOutput } from './dto/login-user-output';
import { LoginUserInput } from './dto/login-user.input';
import { NewUserInput } from './dto/new-user.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(() => User)
  async registerUser(@Args('newUserInput') userInput: NewUserInput) {
    // check user exists
    const { email } = userInput;
    const findUserByEmail = await this.usersService.findByEmail(email);

    if (findUserByEmail)
      throw new BadRequestException('این کاربر قبلا ثبت نام کرده است .');

    return await this.usersService.createUser(userInput);
  }

  @Mutation(() => LoginUserOutput)
  async login(@Args('loginInput') loginInput: LoginUserInput) {
    return this.usersService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
