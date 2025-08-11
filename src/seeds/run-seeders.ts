import { DataSource } from 'typeorm';
import dataSource from '../../typeorm.config';
import { MainSeeder } from './main.seeder';

async function runSeeders() {
    console.log('📦 Initializing database connection...');
    
    try {
        await dataSource.initialize();
        console.log('✅ Database connected successfully');
        
        await MainSeeder.run(dataSource);
        
    } catch (error) {
        console.error('❌ Error running seeders:', error);
        process.exit(1);
    } finally {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
            console.log('📦 Database connection closed');
        }
    }
}

// Chạy seeder
runSeeders();
