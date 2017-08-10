const routes = require('express').Router({ mergeParams : true });

module.exports = (services, modules)=>{
    routes.post('/', require('./create')(services, modules));    
    return routes;
};


