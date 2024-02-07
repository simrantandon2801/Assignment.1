const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({

	Name: { type: String, required: true },
	Email: { type: String, required: true },
	Password: { type: String, required: true },

	photo:Buffer
});
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);
const validate1 = (data) => {
	console.log(data,'user')
	
	const schema = Joi.object({

		Name: Joi.string().required().label("Name"),
		Email: Joi.string().email().required().label("Email"),
		Password: passwordComplexity().required().label("Password"),
		
		
	
        
	})
	return schema.validate(data);
};

module.exports = { User, validate1 };