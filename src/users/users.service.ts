import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserInput } from './dto/new-user.input';
import { User, UserDocument } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { LoginUserOutput } from './dto/login-user-output';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(newUserInput: NewUserInput): Promise<User> {
    const { email, name, password } = newUserInput;
    const newUser = new this.userModel({
      email,
      name,
      password: this.generateHash(password),
    });

    return newUser.save();
  }
  async login(loginInput: LoginUserInput): Promise<LoginUserOutput> {
    const findUser = await this.findByEmail(loginInput.email);

    if (!findUser) throw new BadRequestException('کاربر یافت نشد.');

    //check password
    const passwordMatch = await bcrypt.compare(
      loginInput.password,
      findUser.password,
    );
    if (!passwordMatch) throw new BadRequestException('کلمه عبور صحیح نیست .');

    const payload = {
      email: findUser.email,
      sub: findUser._id,
    };
    return {
      user: findUser,
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_PASSPORT_SECRET_KEY,
      }),
    };
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  async findOne(id: string): Promise<User | false> {
    const findUser = await this.userModel.findById(id);
    if (!findUser) return false;
    return findUser;
  }

  generateHash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
