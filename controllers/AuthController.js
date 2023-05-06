const AuthService = require("../services/AuthService");

class AuthController {
    
    static async signup(req, res) {
        try {
            await AuthService.signup(req.body);
            res.status(201).end();
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    static async signin(req, res) {
        try {
            const token = await AuthService.signin(req.body);
            res.status(200).json(token);
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

module.exports = AuthController;