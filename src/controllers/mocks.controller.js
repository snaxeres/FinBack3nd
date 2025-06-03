//crear mascotas
import MockingService from "../services/mocking.js";

const createPets = async (req,res)=>{
    const pets = await MockingService.createPetsMocking(50);
    res.send({status:"Exitoso", payload: pets})
}

const createUsers = async (req,res)=>{
    const users = await MockingService.createUsersMocking(50);
    res.send({status: "exitoso", payload: users})
}


const generateData = async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    try {
        const { insertedUsers, insertedPets } = await MockingService.generateData(users, pets);
        res.status(201).json({
            status: "success",
            message: `Se insertaron ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};


export default {
    createPets,
    createUsers,
    generateData
}