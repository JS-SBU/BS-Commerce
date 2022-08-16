import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsPhoneNumber } from 'class-validator';
import { regexConfig } from 'config/phone';
import { Address, User } from 'models';

@ObjectType('AdminAddress')
@InputType('AdminAddressInput')
export class AdminAddress implements Address {
  @Field({ nullable: true })
  id?: string;

  @Field()
  addressLine1: string;

  @Field({ nullable: true })
  addressLine2?: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  postCode: string;
}

@ObjectType()
export class Admin implements User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  displayName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  provider?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field(type => [AdminAddress], { nullable: true })
  addresses?: AdminAddress[];

  @Field({ nullable: true })
  status?: string;

  @Field(type => Boolean, { nullable: true })
  active?: boolean;

  @Field({ nullable: true })
  resetPasswordToken?: string;

  @Field(type => Int, { nullable: true })
  resetPasswordExpires?: number;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  provider: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber(regexConfig.phone as any, { message: 'Please Enter the Valid Phone Number!' })
  phone: string;

  @Field({ nullable: true })
  gender: string;

  @Field(type => AdminAddress, { nullable: true })
  address: AdminAddress;

  @Field({ nullable: true })
  status: string;

  @Field(type => Boolean, { nullable: true })
  active: boolean;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}

@ObjectType()
export class AdminResponse {
  @Field(type => Int)
  code: number;

  @Field(type => Admin, { nullable: true })
  data?: Admin;
}

@ObjectType()
export class ChangePasswordResponseMessage {
  @Field()
  message: string;
}

@ObjectType()
export class ChangePasswordResponse {
  @Field(type => Int)
  code: number;

  @Field(type => ChangePasswordResponseMessage, { nullable: true })
  data?: ChangePasswordResponseMessage;
}