const fs = require('fs');
const query = fs.readFileSync('data-access/sql/create-product.sql','utf-8');

module.exports = (services, modules)=>{
    return (req, res, next)=> {                
        services["dal"].executeSQL(query, req.body).then(rs => res.send(rs));    
    }    
};
