const dbConn = require("../config/db");
const mysql = require("mysql");

const getVehicles = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM vehicles LIMIT 8"; //DESC
    dbConn.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getVehiclesLimit = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM vehicles ORDER BY id ASC LIMIT 4"; //DESC
    dbConn.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const postNewVehicles = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;
    dbConn.query(sqlQuery, body, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({
        status: 201,
        result,
      });
    });
  });
};

const getVehicleById = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM vehicles WHERE id = ${vehicleId}`;
    dbConn.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const deleteVehicle = (vehicleId) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `DELETE FROM vehicles WHERE id = ${vehicleId}`;
    dbConn.query(sqlQuery, (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const getVehiclesName = (keyword) => {
  return new Promise((resolve, reject) => {
    const selectQuery = `SELECT * FROM vehicles`;
    const searchQuery = ` WHERE name LIKE ?`;
    const sqlQuery = selectQuery + searchQuery;
    dbConn.query(sqlQuery, keyword, (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0) return resolve({ status: 404, result });
      resolve({ status: 200, result });
    });
  });
};

const getOrder = (query, keyword) => {
  return new Promise((resolve, reject) => {
    // let sqlQuery = `SELECT * FROM vehicles`;
    let sqlQuery = `SELECT name, type , city, location , id FROM vehicles`;
    let nextPage = '?';
    let prevPage = '?';
    console.log(query)

    console.log('ojan keybword'+keyword)

    let statement = [];
    console.log('1')

    let data="";
    let order = query.order || 'name';

    console.log('1.1.' + query.order)
    let orderBy = "";
    if (query.by && query.by.toLowerCase() == "name") orderBy = "name";
    if (query.by && query.by.toLowerCase() == "type") orderBy = "type";
    if (query.by && query.by.toLowerCase() == "city") orderBy = "city";
    if (query.by && query.by.toLowerCase() == "id") orderBy = "id";
    console.log('2')
    if (order && orderBy) {
    console.log('11')

      sqlQuery += ` ORDER BY ? ?`;
      statement.push(mysql.raw(orderBy), mysql.raw(order));
      nextPage += "by=" + query.by;
      prevPage += "by=" + query.by;   
    }  else{
      orderBy = 'name'
    }
    // const statement = [];
    // const order = query.order;
    console.log('3')

    let types = "";
    if (query.type && query.type.toLowerCase() == "motorbike") types = "motorbike";
    if (query.type && query.type.toLowerCase() == "bike") types = "bike";
    if (query.type && query.type.toLowerCase() == "cars") types = "cars";
    
    console.log('4')

    let locations = "";
    if (query.location && query.location.toLowerCase() == "bromo") locations = "bromo";
    if (query.location && query.location.toLowerCase() == "malang") locations = "malang";
    if (query.location && query.location.toLowerCase() == "jakarta") locations = "jakarta";
    if (query.location && query.location.toLowerCase() == "yogyakarta") locations = "yogyakarta";
    if (query.location && query.location.toLowerCase() == "surabaya") locations = "surabaya";
    if (query.location && query.location.toLowerCase() == "bali") locations = "bali";
    
    console.log('4.1')
    console.log(keyword)
    if(keyword){
      sqlQuery += ` WHERE name LIKE ?`;
      statement.push(keyword);  
        nextPage += "name=" + query.name;
        prevPage += "name=" + query.name;  
      }
    console.log('4.2')
    if(locations){
      sqlQuery += ` AND location = ?`;
      statement.push(locations);  
      nextPage += "location=" + query.location;
      prevPage += "location=" + query.location;  
    }
    if(types){
      sqlQuery += ` AND type = ?`;
      statement.push(types);  
      nextPage += "type=" + query.type;
      prevPage += "type=" + query.type;  
    }
    
    

    const countQuery = `SELECT COUNT(*) AS "count" FROM vehicles`;
    dbConn.query(countQuery, (err, result) => {
    console.log('5')

      if (err) return reject({ status: 500, err });
      const page = parseInt(query.page || '1');
      console.log('ansaj ' + page)
      const limit = parseInt(query.limit || '5');
      const count = result[0].count;
      // if (query.page && query.limit) {
        sqlQuery += " LIMIT ? OFFSET ?";
        const offset = (page - 1) * limit;
        statement.push(limit, offset);
      // }

    console.log('5')

      const meta = {
        next:
          page == Math.ceil(count / limit)
            ? null
            : `vehicles`+nextPage,
        prev:
          page == 1
            ? null
            : `vehicles`+prevPage,
        count, page
      };
      console.log(statement)
    console.log('6')

      // console.)

      dbConn.query(sqlQuery, statement, (err, result) => {
    console.log('7')

      if (err) {
        console.log(err)
        return reject({ status: 500, err });}
        console.log(result)
        resolve({ status: 200, result: { data: result, meta } });
      });
    });
  });
};

const updateVehicle = (saveImage, id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `UPDATE vehicles SET ? WHERE id = ${id}`;
    dbConn.query(sqlQuery, [saveImage, id], (err, result) => {
      if (err) return reject({
          status: 500,
          err
      })
      resolve({
          status: 200,
          result
      });
  });
});
};

const insertDataVehicles = (newBody) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = `INSERT INTO vehicles SET ?`;

    newBody = {
      ...newBody,
      // id,
    };
    dbConn.query(sqlQuery, newBody, (err, result) => {
      if (err)
        return reject({
          status: 500,
          err,
        });
      resolve({
        status: 200,
        result,
      });
    });
  });
};

module.exports = {
  getVehicles,
  postNewVehicles,
  getVehicleById,
  deleteVehicle,
  getVehiclesName,
  getOrder,
  updateVehicle,
  getVehiclesLimit,
  insertDataVehicles,
}; //, getVehiclesLimit
