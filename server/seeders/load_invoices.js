import fs from 'fs';
import path from 'path';
import { pool } from '../c_db.js';   
import csv from 'csv-parser';

export async function loadinvoices() {
    const rutaArchivo = path.resolve('server/data/03_invoices.csv');
    const invoices = [];

    return new Promise((resolve,reject)=>{ 
        fs.createReadStream(rutaArchivo)
        .pipe(csv())
        .on("data",(fila) =>{
            invoices.push([
                fila.invoice_id,
                fila.client_id,
                fila.invoice_number,
                fila.biling_period,
                fila.biling_amount,
                fila.paid_amount
            ])        
        })
        .on("end",async () =>{
            try {
                const sql = 'INSERT INTO invoices(invoice_id,client_id,invoice_number,biling_period,biling_amount,paid_amount) VALUES ?';
                const [result] = await pool.query(sql, [invoices]);
                
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