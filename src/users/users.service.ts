import { Injectable } from '@nestjs/common';

@Injectable()   //this means that UsersService can be managed by Nest
export class UsersService {

    private users = [   //this is a property inside the UsersService class. We pass the objects manually since we didn't connect to the DB yet.
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "sincere@april.biz",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "ervin@april.biz",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "clementine@april.biz",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "patricia@april.biz",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "chelsey@april.biz",
            "role": "ADMIN"
        },
    ]

    //NOW WE CREATE SOME METHODS AFTER THE ROUTES WE HAVE IN THE CONTROLLER
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {

        if (role) {   //if a role was passed
            return this.users.filter(user => user.role === role);   //refers to the users property that we can filter. This will only return the users that have that role passed in.
        }

        //if no role was passed, we return all users
        return this.users;

    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {  //the id will need to be created aswell since we aren't connected to the DB

        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);     //this will sort users by highest it

        const newUser = {
            id: usersByHighestId[0].id + 1,     //we generate the next highest id
            ...user //we spread in the rest of the user that we receive in
        }

        this.users.push(newUser);
        return newUser;

    }

    update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {

        this.users = this.users.map(user => {

            if (user.id === id) {
                return { ...user, ...updatedUser }   //spread in all the properties of the existing user and then the updated user will override just any property was passed in
            }
            return user;

        })

        return this.findOne(id) //after we updated the user, we want to return just the one we updated

    }

    delete(id: number) {

        const removedUser = this.findOne(id);

        this.users = this.users.filter(user => user.id !== id)     //we remove the user that needs to be removed. this will exclude the user that needs to be removed and will no longer be in users

        return removedUser;

    }

}
