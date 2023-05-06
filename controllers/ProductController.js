const ProductService = require("../services/ProductService");

class ProductController {
    
    static async create(req, res) {
        try {
            const product = await ProductService.create(req.body);
            res.status(201).json(product);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    static async findAll(req, res) {
        try {
            const products = await ProductService.findAll();
            res.status(200).json(products);
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    static async findById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.findById(id);
            res.status(200).json(product);
        }
        catch(err) {
            console.log(err);
            if(err.code) {
                res.status(err.code).json(err);
            }
            else {
                res.status(500).json(err);
            }
        }
    }
}

module.exports = ProductController;