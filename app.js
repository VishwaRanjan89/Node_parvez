const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./handlers');
const config = require('./config/config');

let app = express();
app.Services = {};
app.Models = {};

let registerRoutes = (app, routes)=>{
    if(routes.name === 'router'){
        app.use('/', routes);
    }else{
        app.use('/', routes(app.Services,app.Models));
    }
}

let loadService = ()=>{
    return Promise.all(Object.keys(config).map(key=>{
        let service = require(config[key].service);
        app.Services[key] = service;
        return service.init(config[key]);
    }));
}

let createServer = (app) => {
    return new Promise((resolve, reject)=> {
        let httpServer = http.createServer(app);
        resolve(httpServer);
    });
}

let listen = (server)=>{
    return new Promise((resolve, reject)=> {
        
        server.listen(3000, (err)=>{
            if(err){
                console.log('Error: ',err);
                reject(err);
            }else{                
                resolve(true);
            }            
        });        
    });
}

loadService().then(()=>{
    
    app.use(bodyParser.json());
    app.disable('x-powered-by');
    registerRoutes(app, routes);
    
    createServer(app).then(listen).then(()=>{
        console.log('Application started at port 3000');
    });
})
