const mysql = require('mysql');

let __connpool;
let __initialized;
let __sqlLatencyThreshold;

let init = (configuration) => {
        
        if (__connpool) {
            return Promise.resolve();
        
        }
        
        return new Promise((res, rej) => {
            __connpool = mysql.createPool(configuration);
            __initialized = true;
            res(this);
        });
    }

let executeSQL = (sql, bindParams) => {
    return _executeSQL(sql, bindParams);
}


let _executeSQL = (sql, bindParams) => {
        let startTime = new Date();

        return new Promise((res, rej) => {
            __connpool.getConnection((err, connection) => {
                if (err) {
                    console.log('error', sql, startTime, new Date(), err);
                    throw err;
                }

                let connectTime = new Date();
                connection.config.queryFormat = function (query, values) {
                    if (!values) return query;
                    return query.replace(/\:(\w+)/g, function (txt, key) {
                        if (values.hasOwnProperty(key)) {
                        return this.escape(values[key]);
                        }
                        return txt;
                    }.bind(this));
                };

                connection.query(sql, bindParams, (error, results, fields) => {
                    connection.release();

                    if (error) {
                        console.log('error', sql, startTime, connectTime, err);
                        throw err
                    };

                    if (__sqlLatencyThreshold && (new Date() - startTime) > __sqlLatencyThreshold) {
                        console.log('warn', sql, startTime, connectTime, null, results.rowsAffected || (results.rows && results.rows.length));
                    }

                    res(results);
                });
            });
        });
    }


module.exports = {
    init: init,
    executeSQL: executeSQL
}