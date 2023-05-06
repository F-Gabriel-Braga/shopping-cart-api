const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const NOT_FOUND = { code: 404, message: "Produto não encontrado." };
const INVALID_DATA = { code: 404, message: "Dados inválidos." };

class ProductService {

    static async create(productData) {
        const { name, descricao, categoria, price } = productData;
        const product = await prisma.product.create({ data: {
            name,
            descricao,
            categoria,
            price
        } });
        return product;
    }
    
    static async findAll() {
        return await prisma.product.findMany();
    }

    static async findById(id) {
        if(!id) throw INVALID_DATA;
        
        const product = await prisma.product.findUnique({ where: { id } });

        if(!product) throw NOT_FOUND;

        return product;
    }
}

module.exports = ProductService;