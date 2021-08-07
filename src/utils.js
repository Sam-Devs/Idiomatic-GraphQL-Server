const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayLoad(token) {
    return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
    if(req)
    const auhHeader = 
}