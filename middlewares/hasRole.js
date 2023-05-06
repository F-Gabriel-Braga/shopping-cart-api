const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

function hasRole(role) {
    return async (req, res, next) => {
        const authorization = req.headers.authorization;
        if(!authorization) {
            res.status(401).json({ message: "Token inválido." });
            return;
        };

        const [authType, token] = authorization.split(" ");
        try {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if(err) {
                    res.status(403).json({ message: "Acesso negado." });
                    return;
                }

                const user = await prisma.user.findUnique({ where: {id: decoded.id} });

                if(!user) {
                    res.status(403).json({ message: "Usuário não encontrado." });
                    return;
                }
                
                if(role === "*") {
                    next();
                    return;
                }
                else {
                    if(decoded.role === user.role && decoded.role === role) {
                        next();
                    }
                }
                });
            }
            catch(err) {
                res.status(500).json({ message: "Algo deu errado." });
            }
    }
}

module.exports = hasRole;