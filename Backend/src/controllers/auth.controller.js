import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import { User } from '../models/user.model.js'; // Importa la clase User desde user.model.js

const FILENAME = resolve('Users.json');

let users = [];

// Verificar y crear archivo si no existe
if (!existsSync(FILENAME)) {
    writeFileSync(FILENAME, JSON.stringify(users));
} else {
    // Si el archivo existe, cargar los datos
    const fileData = readFileSync(FILENAME, 'utf8');
    users = JSON.parse(fileData);
}

// Función que ayuda a actualizar el contenido del archivo json
function updateDataFile() {
    writeFileSync(FILENAME, JSON.stringify(users));
}



export const register = async (req, res) => {
    const { carnet, nombres, apellidos, genero, facultad, carrera, correo, contrasena } = req.body;
    try {
        const passwordHash = await bcrypt.hash(contrasena, 10)

        const newUser = new User(carnet, nombres, apellidos, genero, facultad, carrera, correo, passwordHash);
         
        console.log(newUser);
        users.push(newUser);

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

        updateDataFile();
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const login = async (req, res) => {
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
        });

    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: error.message});
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
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