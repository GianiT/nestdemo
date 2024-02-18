export class CreateUserDto{ //this is a DTO for the data we will be receiving in the request.
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}

