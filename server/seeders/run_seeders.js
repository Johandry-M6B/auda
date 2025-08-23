import { loadclient } from "./load_client.js";


(async () => {
    try {
        console.log('LOANDIG Of THE SEEDERS....');

        await loadclient();

        // Add more seeders here as needed
        console.log('SEEDERS LOADED SUCCESSFULLY');     
    } catch (error) {
        console.error('Error loading seeders:', error.message);
    } finally {
        process.exit(0);
    }
})();