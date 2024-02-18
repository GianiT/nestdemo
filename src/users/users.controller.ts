import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//Decorators
@Controller('users')    // '/users'
export class UsersController {

    //add instance of our service to the controller (DEPENDENCY INJECTION)

    constructor(private readonly usersService: UsersService) { };
    //this creates an instance of that UsersService. This is a 'singleton'(object that can be created just once)
    /* 
    the alternative to this would be:
        const usersService = new UsersService();
    */
    //Now we can user UsersService in our routes and update them.

    //plan out the routes to handle
    @Get()  //Get decorator GET /users or /users?role=value -> Query Params
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);      //we return an empty array
    }
    //Query params can be optional

    @Get(':id')  //GET /users/:id. We need to pass ':id' in the decorator
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)   //+ is called 'unary' and it turns the string id into number
    }

    @Post() //POST /users
    //here we still have an empty object. we have to make it match to the methods we have in Users
    //we can notice that the type is passed in twice (name, email, etc), it might be better to put it in once. we will do that
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {    //object type
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')   //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdateDto: UpdateUserDto) {      //We will have the id param, but also the body data
        return this.usersService.update(id, userUpdateDto);
    }

    @Delete(':id')   //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
