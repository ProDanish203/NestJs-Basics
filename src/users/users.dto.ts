// This file is used for defining the types and adding the validations
// DTO: Data Transfer Object

import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be either ADMIN or USER' })
  role: 'ADMIN' | 'USER';
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
