// const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = "vaibhav";



// Middleware to verify JWT and extract user role
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
}

function checkAdminRole(req, res, next) {
    const userRole = req.user.role;
  
    if (userRole === 'admin') {
      next(); // Allow access to the next middleware or route handler
    } else {
      res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
  }


  module.exports ={
    authenticateToken,
    checkAdminRole
  }


