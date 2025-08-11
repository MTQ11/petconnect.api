import { DataSource } from 'typeorm';
import { SpeciesSeeder } from './species.seeder';
import { BreedsSeeder } from './breeds.seeder';

export class MainSeeder {
    public static async run(dataSource: DataSource): Promise<void> {
        console.log('🌱 Starting database seeding...');
        
        try {
            // Chạy species seeder trước
            await SpeciesSeeder.run(dataSource);
            
            // Chạy breeds seeder sau (vì breeds phụ thuộc vào species)
            await BreedsSeeder.run(dataSource);
            
            console.log('🎉 Database seeding completed successfully!');
        } catch (error) {
            console.error('❌ Error during seeding:', error);
            throw error;
        }
    }
}
