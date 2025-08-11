import mysql from "mysql2/promise"




export const pool = mysql.createPool({
    host:"localhost",
    database:"bibloteca_easy",
    port:"3306",
    user:"root",
    password:"Combita1234+",
    connectionLimit:10,
    waitForConnections:true,
    queueLimit:0

})

 async function probarDataBase(){
    try{
        const connection = await pool.getConnection();
        console.log('Conexion a la base de datos exittosa')
        connection.release();
    }catch (error){
        console.error('Error al conectar con la base de datos:', error.message)
    }

}

probarDataBase()|