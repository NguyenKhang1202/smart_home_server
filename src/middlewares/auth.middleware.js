const jwt = require('jsonwebtoken');
const APIStatus = require('../../src/constants/APIStatus');
const { getUserDb } = require('../db/user.db');
const { jwtKey } = require('../config');
const apiResponse =require('../utils/apiResponse');

// module.exports = (credentials = []) => {
// 	return (req, res, next) => {
// 		// Allow for a string or array
// 		if (typeof credentials === 'string') credentials = [credentials];
// 		const token = req.headers.authorization;
// 		if (!token) return res.status(401).json({ message: 'Access Denied' });

// 		try {
// 			const verified = jwt.verify(
// 				token.split(' ')[1],
// 				process.env.TOKEN_SECRET
// 			);

// 			// If dont have credentials, next
// 			if (credentials.length > 0) {
// 				// If credentials include user role, next
// 				if (credentials.includes(verified.role)) {
// 					next();
// 				} else {
// 					res.status(403).json({ message: 'Forbidden' });
// 				}
// 			} else {
// 				next();
// 			}
// 		} catch (err) {
// 			res.status(400).json({ message: 'Invalid Token' });
// 		}
// 	};
// };

const authUser = async (req, res, next) => {
	const token = getHeaderToken(req);
	if (!token) return res.status(401).json(apiResponse({ status: APIStatus.FAIL, msg: 'You are not authorized' }));
	// console.log(jwtKey);
	try {
	  const decode = jwt.verify(token, jwtKey);
	  const user = await getUserDb({ _id: decode._id });
	  if (!user) return res.status(400).json(apiResponse({ status: APIStatus.FAIL, msg: 'Invalid token' }));
  
	  req.user = user;
	  next();
	} catch (err) {
	  console.log(err);
	  return res.status(400).json(apiResponse({ status: APIStatus.FAIL, msg: 'Invalid token' }));
	}
  }
  
  const authAdmin = async (req, res, next) => {
	const token = getHeaderToken(req);
	if (!token) return res.status(401).json(apiResponse({ status: APIStatus.FAIL, msg: 'You are not authorized' }));
  
	try {
	  const decode = jwt.verify(token, jwtKey);
	  const user = await getUserDb({ _id: decode._id });
	  if (!user) return res.status(400).json(apiResponse({ status: APIStatus.FAIL, msg: 'Invalid token' }));
  
	  if (user.role !== 'admin') return res.status(403).json(apiResponse({ status: APIStatus.FAIL, msg: 'You need admin rights to use this api' }));
	  req.user = user;
	  next();
	} catch (err) {
	  console.log(err);
	  return res.status(400).json(apiResponse({ status: APIStatus.FAIL, msg: 'Invalid token' }));
	}
  }
  
  const getHeaderToken = (req) => {
	const originalToken = req.header('Authorization') || req.header('x-access-token');
	if (!originalToken) return null;
  
	const token = originalToken.replace('Bearer ', '');
	return token;
  }
  
  module.exports = {
	authUser,
	authAdmin
  }
