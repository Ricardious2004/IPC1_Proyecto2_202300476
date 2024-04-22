
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import { User } from '../models/user.model.js'; // Importa la clase User desde user.model.js
import { users, updateDataFile, hashPasswords } from '../data/userData.js'; // Importa users y updateDataFile desde userData

// Define the register function to handle registration requests
export const register = async (req, res) => {
    // Destructure required information from the request body
    const { carnet, nombres, apellidos, genero, facultad, carrera, correo, contrasena } = req.body;
    try {
        // Check if a user with the provided carnet already exists
        let userExists = users.find(user => user.carnet === carnet);
        // If user already exists, send a 400 status code with a message
        if (userExists) {
        return res.status(400).json({ message: "User already exists" });    
        }

        // Hash the provided password using bcrypt
        const passwordHash = await bcrypt.hash(contrasena, 10)

        // Create a new User object with the provided information
        const newUser = new User(carnet, nombres, apellidos, genero, facultad, carrera, correo, passwordHash);

        // Set the isHashedPassword property to true
        newUser.isHashedPassword = true;

        console.log(newUser);

        // Push the new user to the users array
        users.push(newUser);

        hashPasswords();
        // Update the data file with the new user
        updateDataFile();

        const token = await createAccessToken({ carnet: newUser.carnet });

        res.cookie('token', token);


        res.json({
            carnet: newUser.carnet,
            nombres: newUser.nombres,
            apellidos: newUser.apellidos,
            genero: newUser.genero,
            facultad: newUser.facultad,
            carrera: newUser.carrera,
            correo: newUser.correo,
            contrasena: newUser.contrasena,
        });

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

// Define the login function to handle login requests
export const login = async (req, res) => {
    // Destructure required information from the request body
    const { carnet, contrasena } = req.body;
    try {

        const userFound = users.find(user => user.carnet === carnet);

        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(contrasena, userFound.contrasena);

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ carnet: userFound.carnet });
        res.cookie("token", token);
         
        res.json({
            codigo: userFound.carnet,
            nombres: userFound.nombres,
            apellidos: userFound.apellidos,
            genero: userFound.genero,
            facultad: userFound.facultad,
            carrera: userFound.carrera,
            correo: userFound.correo,
            contrasena: userFound.contrasena,
        });

    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: error.message});
    }
}

export const logout = (req, res) => {
  res.clearCookie("token",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out.")
}

export const profile = async (req, res) => {
    const userFound = await users.find(user => user.carnet === req.user.carnet);


    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        codigo: userFound.carnet,
        nombres: userFound.nombres,
        apellidos: userFound.apellidos,
        genero: userFound.genero,
        facultad: userFound.facultad,
        carrera: userFound.carrera,
        correo: userFound.correo,
        contrasena: userFound.contrasena,
    });

}