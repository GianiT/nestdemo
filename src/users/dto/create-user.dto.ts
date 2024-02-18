import { IsEmail, IsEnum, IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class CreateUserDto { //this is a DTO for the data we will be receiving in the request.
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: "Valid role required."
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}

