const routes = require('express').Router({ mergeParams : true });

module.exports = (services, modules)=>{
    routes.post('/', require('./get')(services, modules));    
    return routes;
};
