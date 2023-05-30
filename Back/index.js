const express = require("express");
let bodyParser = require("body-parser");
let mysql = require("promise-mysql");
require('dotenv').config();

const app = express();
app.use(bodyParser.json())


//Conexión con la BD
let con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

const getConnection = () => {
    return con;
}


//Configuramos los estaticos del servidor
app.use('/', express.static('html'));

//Enviamos el frontend
app.get("/resumenGeneral", (req, res) =>{
    res.sendFile('html/index.html', {root: __dirname});
});
app.get("/resumen", (req, res) =>{
    res.sendFile('html/index.html', {root: __dirname});
});
app.get("/nuevaFamilia", (req, res) =>{
    res.sendFile('html/index.html', {root: __dirname});
});


//Info de la API
app.get("/api", (req, res) =>{
    res.sendFile('html/indexAPI.html', {root: __dirname});
});

//Get all familias
app.get("/api/familias", async(req, res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM FAMILIA;');
        res.json(result);
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//GET de una familia
app.get("/api/familias/:id", async(req,res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM FAMILIA WHERE IdFamilia = " + req.params.id + ";");
        res.json(result);
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//GET de una familia by name
app.get("/api/familias/byName/:name", async(req, res) =>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM FAMILIA WHERE NombreFamilia = '" + req.params.name + "';");
        res.json(result);
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO", "ErrorMessage": "' + error + '"}'));
    }
});

//POST de una familia
app.post("/api/familias", async(req, res) =>{
    let nombreFamilia = req.body.NombreFamilia;
    try{
        if(nombreFamilia == "undefined"){
            throw 'Incorrect body'
        }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `FAMILIA` VALUES (0, \"" + nombreFamilia + "\");");
        res.status(200);
        res.json(JSON.parse('{"result":"OK"}'));
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO", "ErrorMessage": "' + error + '"}'));
    }
});

//Get de un sorteo
app.get("/api/sorteo/:id/:Fecha", async(req, res) =>{
    let fechaSorteo = req.params.Fecha;

    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM FAMILIA JOIN ADMINISTRACION ON FAMILIA.IdFamilia = ADMINISTRACION.IdFamiliaAdministracion WHERE ADMINISTRACION.FechaSorteo = '" + fechaSorteo
        + "' AND ADMINISTRACION.IdFamiliaAdministracion = " + req.params.id + ";");
    res.json(result);
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//POST de un sorteo
app.post("/api/sorteo", async(req, res) =>{
    let idFamiliaAdministracion = req.body.IdFamilia;
    let fechaSorteo = req.body.FechaSorteo;
    let decimos28 = req.body.Decimos28;
    let decimos64 = req.body.Decimos64;
    let papeletas28 = req.body.Papeletas28;
    let papeletas64 = req.body.Papeletas64;

    try{
        if(idFamiliaAdministracion == "undefined" || fechaSorteo == "undefined" || decimos28 == "undefined" || decimos64 == "undefined" || papeletas28 == "undefined" || papeletas64 == "undefined"){
            throw 'Incorrect body'
        }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO `ADMINISTRACION` VALUES (0, " + idFamiliaAdministracion + ", \"" + fechaSorteo + "\", " + decimos28 + " ," + decimos64 + " ," + papeletas28 + " ," + papeletas64 + ");");
        res.status(200);
        res.json(JSON.parse('{"result":"OK"}'));
    }catch(error){
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//PUT de un sorteo
app.put("/api/sorteo/:idFamilia/:fecha", async(req, res) =>{
    let decimos28 =req.body.Decimos28;
    let decimos64 = req.body.Decimos64;
    let papeletas28 = req.body.Papeletas28;
    let papeletas64 = req.body.Papeletas64;
    let fechaSorteo = req.params.fecha;

    try{
        if(decimos28 == "undefined" || decimos64 == "undefined" || papeletas28 == "undefined" || papeletas64 == "undefined"){
            throw 'Incorrect body'
        }
        const connection = await getConnection();
        const result = await connection.query("UPDATE administracion SET administracion.Decimos28 = " + decimos28 + ", administracion.Decimos64 = " + decimos64 + 
            ", administracion.Papeletas28 = " + papeletas28 + ", administracion.Papeletas64 = " + papeletas64 + 
            " WHERE ADMINISTRACION.FechaSorteo = '" + fechaSorteo + "' AND administracion.IdFamiliaAdministracion = " + req.params.idFamilia + ";");
        res.status(200);
        res.json(JSON.parse('{"result":"OK"}'));
    }catch(error){
        console.log(error);
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

// Obtener el resumen de una familia entre dos fechas
app.post("/api/sorteo/resumen", async(req, res) =>{
    let id = req.body.IdFamilia;
    let fechaDesde = req.body.FechaDesde;
    let fechaHasta = req.body.FechaHasta;

    try{
        if(id == "undefined" || fechaDesde == "undefined" || fechaHasta == "undefined"){
            throw 'Incorrect body';
        }
        const connection = await getConnection();
        const result = await connection.query("SELECT SUM(Decimos28) AS 'TotalDecimos28', SUM(Decimos64) AS 'TotalDecimos64', SUM(Papeletas28) AS 'TotalPapeletas28', SUM(Papeletas64) AS 'TotalPapeletas64' " +
        "FROM ADMINISTRACION JOIN FAMILIA " + 
        "ON ADMINISTRACION.IdFamiliaAdministracion = FAMILIA.IdFamilia " +
        "WHERE ADMINISTRACION.IdFamiliaAdministracion = " + id + " AND ADMINISTRACION.FechaSorteo BETWEEN '" + fechaDesde + "' AND '" + fechaHasta + "';");

        let resultJSON = JSON.parse('{"TotalDecimos28": ' + result[0].TotalDecimos28 +',\n "TotalDecimos64": ' + result[0].TotalDecimos64 +',\n '+
        '"TotalPapeletas28": ' + result[0].TotalPapeletas28 +',\n "TotalPapeletas64": ' + result[0].TotalPapeletas64 +'}');

        res.status(200);
        res.json(resultJSON);
    }catch(error){
        console.log(error);
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//Obtener el resumen completo de una familia entre dos fechas
app.post("/api/sorteo/resumenCompleto", async(req, res)=>{
    let id = req.body.IdFamilia;
    let fechaDesde = req.body.FechaDesde;
    let fechaHasta = req.body.FechaHasta;

    try{
        if(id == "undefined" || fechaDesde == "undefined" || fechaHasta == "undefined"){
            throw 'Incorrect body';
        }
        const connection = await getConnection();
        const result = await connection.query("SELECT Decimos28, Decimos64, Papeletas28, Papeletas64, DATE_FORMAT(FechaSorteo, '%d/%m/%Y') AS 'FechaSorteo' " +
        "FROM ADMINISTRACION JOIN FAMILIA "+
        "ON ADMINISTRACION.IdFamiliaAdministracion = FAMILIA.IdFamilia " +
        "WHERE ADMINISTRACION.IdFamiliaAdministracion = " + id + " AND ADMINISTRACION.FechaSorteo BETWEEN '" + fechaDesde + "' AND '" + fechaHasta + "';");

        let resultJSON = JSON.stringify(result);
        resultJSON = JSON.parse(resultJSON);

        res.status(200);
        res.json(resultJSON);
    }catch(error){
        console.log(error);
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

app.post("/api/sorteo/resumenGeneral", async(req, res)=>{
    let fechaDesde = req.body.FechaDesde;
    let fechaHasta = req.body.FechaHasta;

    try{
        if(fechaDesde == "undefined" || fechaHasta == "undefined"){
            throw 'Incorrect body';
        }
        const connection = await getConnection();
        const result = await connection.query("SELECT SUM(Decimos28) AS 'TotalDecimos28', SUM(Decimos64) AS 'TotalDecimos64', SUM(Papeletas28) AS 'TotalPapeletas28', SUM(Papeletas64) AS 'TotalPapeletas64' " +
        "FROM ADMINISTRACION JOIN FAMILIA " + 
        "ON ADMINISTRACION.IdFamiliaAdministracion = FAMILIA.IdFamilia " +
        "WHERE ADMINISTRACION.FechaSorteo BETWEEN '" + fechaDesde + "' AND '" + fechaHasta + "';");

        let resultJSON = JSON.parse('{"TotalDecimos28": ' + result[0].TotalDecimos28 +',\n "TotalDecimos64": ' + result[0].TotalDecimos64 +',\n '+
        '"TotalPapeletas28": ' + result[0].TotalPapeletas28 +',\n "TotalPapeletas64": ' + result[0].TotalPapeletas64 +'}');

        res.status(200);
        res.json(resultJSON);
    }catch(error){
        console.log(error);
        res.status(400);
        res.json(JSON.parse('{"result":"KO"}'));
    }
});

//Iniciar el servidor 
app.listen(3000, () =>{
    console.log("Server on port 3000");
});