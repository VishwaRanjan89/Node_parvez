const routes = require('express').Router({ mergeParams : true });

module.exports = (services, modules)=>{
    routes.use('/script/v1/get', require('./get_v1')(services, modules));
    routes.use('/script/v1/create', require('./create_v1')(services, modules));
    return routes;
};

