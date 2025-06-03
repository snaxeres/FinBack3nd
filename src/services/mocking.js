import { faker } from "@faker-js/faker";
import petModel from "../dao/models/Pet.js"
import userModel from "../dao/models/User.js"

import { createHash } from "../utils/index.js";
class MockingService {
    static async createPetsMocking(cantidad) {
        const pets = [];
        for (let i = 0; i < cantidad; i++) {
            pets.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false,
                birthDate: faker.date.past(),
                image: "https://via.placeholder.com/150"
            })
        }
        return pets;
    }

    static async createUsersMocking(count) {

        const users = [];

        const password = await createHash('coder123', 50);

        for (let i = 0; i < count; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password,
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            });
        }

        return users;
    }

    static async generateData(users = 0, pets = 0) {
        const usersData = await this.createUsersMocking(Number(users));
        const petsData = await this.createPetsMocking(Number(pets));

        const insertedUsers = await userModel.insertMany(usersData);
        const insertedPets = await petModel.insertMany(petsData);

        return {
            insertedUsers,
            insertedPets
        }

    }

}

export default MockingService