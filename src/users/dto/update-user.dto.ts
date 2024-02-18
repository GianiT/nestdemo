import { CreateUserDto } from "./create-user.dto";
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserDto extends PartialType(CreateUserDto) { } //we extend from the PartialType, calling CreateUserDto. We also need the empty curly brackets, otherwise we get an error.