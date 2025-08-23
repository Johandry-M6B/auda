import fs from 'fs';
import path from 'path';
import { pool } from '../c_db.js';   
import csv from 'csv-parser';
import { rejects } from 'assert';

export async function loadclient() {
    const rutaArchivo = path.resolve('server/data/01_client.csv');
    const clientes = [];

    return new Promise((resolve,reject)=>{ 
        fs.createReadStream(rutaArchivo)
        .pipe(csv())
        .on("data",(fila) =>{
            clientes.push([
                fila.id_client,
                fila.full_name.trim(),
                fila.document,
                fila.address,
                fila.phone,
                fila.email
            ])        
        })
        .on("end",async () =>{
            try {
                const sql = 'INSERT INTO clientes(id_client,full_name,document,address,phone,email) VALUES ?';
                const [result] = await pool.query(sql, [clientes]);
                
                console.log(`To insert ${result.affectedRows} Records in the Customers table`);
                resolve();
            } catch (error) {
                console.error('Error inserting data into the client table:', error.message);
                reject(error);
                
            }
        })
        .on("error", (error) => {
            console.error('Error reading CSV file:', error.message);
            reject(error);
        });

    })
    
    
}