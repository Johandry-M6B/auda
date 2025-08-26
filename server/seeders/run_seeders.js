import { loadclient } from "./load_client.js";
import { loadinvoices } from "./load_invoices.js";
import { loadplatforms } from "./load_platforms.js";
import { loadtransactions } from "./load_transactions.js";


(async () => {
    try {
        console.log('LOANDIG Of THE SEEDERS....');

        await loadclient();
        await loadplatforms();
        await loadinvoices();
        await loadtransactions();

        // Add more seeders here as needed
        console.log('SEEDERS LOADED SUCCESSFULLY');     
    } catch (error) {
        console.error('Error loading seeders:', error.message);
    } finally {
        process.exit(0);
    }
})();