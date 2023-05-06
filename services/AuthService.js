const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const UNAUTHORIZED = { code: 401, message: "Credenciais inválidas." };
const NOT_FOUND = { code: 404, message: "Usuário não encontrado." };

const SALT_ROUNDS = 10;

class AuthService {
    static async signup(userData) {
        let { name, email, password } = userData;
        password = await bcrypt.hash(password, SALT_ROUNDS);
        const role = "common";
        return await prisma.user.create({
            data: { name, email, password, role }
        });
    }

    static async signin(userData) {
        const { email, password } = userData;
        const user = await prisma.user.findUnique({ where: { email } });

        if(!user) throw NOT_FOUND;
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(validPassword) {
            const payload = { id: user.id, email: user.email, role: user.role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
            return { type: "Bearer", token };
        }
        throw UNAUTHORIZED;
    }
}

module.exports = AuthService;