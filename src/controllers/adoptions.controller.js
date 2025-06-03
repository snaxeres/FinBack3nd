import { adoptionsService, petsService, usersService } from "../services/index.js"
import mongoose from "mongoose";

const getAllAdoptions = async (req, res) => {
    const result = await adoptionsService.getAll();
    res.send({ status: "success", payload: result })
}

const getAdoption = async (req, res) => {
    const adoptionId = req.params.aid;


    if (!mongoose.Types.ObjectId.isValid(adoptionId)) {
        return res.status(404).send({ status: "error", error: "ID inválido" });
    }

    try {
        const adoption = await adoptionsService.getBy({ _id: adoptionId });

        if (!adoption) {
            return res.status(404).send({ status: "error", error: "Adoption not found" });
        }

        res.send({ status: "success", payload: adoption });

    } catch (error) {
        res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    if (!uid || !pid) {
      return res.status(400).send({ status: "error", error: "Missing user or pet ID" });
    }

    if (!isValidObjectId(uid) || !isValidObjectId(pid)) {
      return res.status(400).send({ status: "error", error: "Invalid user or pet ID" });
    }

    const user = await usersService.getUserById(uid);
    if (!user) {
      console.log("User not found for id", uid);
      return res.status(404).send({ status: "error", error: "User not found" });
    }

    const pet = await petsService.getBy({ _id: pid });
    if (!pet) {
      console.log("Pet not found for id", pid);
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }

    if (pet.adopted) {
      console.log("Pet already adopted:", pet._id);
      return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    }

    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });
    const adoption = await adoptionsService.create({ owner: user._id, pet: pet._id });

    res.status(200).send({ status: "success", message: "Pet adopted", payload: adoption });
  } catch (error) {
    console.error("Error creating adoption:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }

};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}