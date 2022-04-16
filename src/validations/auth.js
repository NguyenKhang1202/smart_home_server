// Validation
const Joi = require('joi');

// Validate register user
const registerValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().min(6).max(30).required(),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,128}$')),
		email: Joi.string().min(6).email(),
		role: Joi.string().valid(
			'admin',
			'customer',
			'inventoryManager',
			'cashier'
		),
	});
	return schema.validate(data);
};

// Validate login user
const loginValidation = (data) => {
	const schema = Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,128}$')),
		email: Joi.string().min(6).email(),
	});
	return schema.validate(data);
};

module.exports = { 
	registerValidation, 
	loginValidation 
};
