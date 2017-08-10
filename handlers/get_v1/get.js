const fs = require('fs');
const query = fs.readFileSync('data-access/sql/get-products.sql','utf-8');

module.exports = (services, modules)=>{
    return (req, res, next)=> {        
        services["dal"].executeSQL(query).then(rs => res.send(rs));    
    }    
};