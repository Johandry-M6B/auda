import fs from 'fs';
import path from 'path';
import { pool } from '../c_db.js';   
import csv from 'csv-parser';

export async function loadtransactions() {
    const rutaArchivo = path.resolve('server/data/04_transactions.csv');
    const transactions = [];

    return new Promise((resolve,reject)=>{ 
        fs.createReadStream(rutaArchivo)
        .pipe(csv())
        .on("data",(fila) =>{
            transactions.push([
                fila.transaction_id,
                fila.transaction_code.trim(),
                fila.transaction_date,
                fila.amount,
                fila.status,
                fila.transaction_type,
                fila.platform_id,
                fila.invoice_id
                
            ])        
        })
        .on("end",async () =>{
            try {
                const sql = 'INSERT INTO transactions(transaction_id,transaction_code,transaction_date,amount,transaction_type,status,platform_id,invoice_id) VALUES ?';
                const [result] = await pool.query(sql, [transactions]);
                
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