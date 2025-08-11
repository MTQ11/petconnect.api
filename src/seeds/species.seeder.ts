import { DataSource } from 'typeorm';
import { Species } from '../modules/species/species.entity';

export const speciesData = [
    {
        name_vi: 'Chó',
        name_en: 'Dog',
        image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2062&q=80',
        description_vi: 'Loài động vật nuôi phổ biến, trung thành và thân thiện với con người',
        description_en: 'Popular pet animal, loyal and friendly to humans'
    },
    {
        name_vi: 'Mèo',
        name_en: 'Cat',
        image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80',
        description_vi: 'Loài động vật nuôi độc lập, dễ thương và có tính cách riêng',
        description_en: 'Independent pet animal, cute and with unique personality'
    },
    {
        name_vi: 'Chim',
        name_en: 'Bird',
        image_url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
        description_vi: 'Các loài chim cảnh như vẹt, chim sẻ, chim cảnh...',
        description_en: 'Ornamental birds like parrots, sparrows, canaries...'
    },
    {
        name_vi: 'Cá',
        name_en: 'Fish',
        image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description_vi: 'Cá cảnh nuôi trong bể, hồ như cá vàng, cá betta...',
        description_en: 'Ornamental fish kept in aquariums like goldfish, betta...'
    }
];

export class SpeciesSeeder {
    public static async run(dataSource: DataSource): Promise<void> {
        const speciesRepository = dataSource.getRepository(Species);

        console.log('Seeding species data...');
        
        for (const speciesItem of speciesData) {
            // Kiểm tra xem species đã tồn tại chưa (theo name_vi hoặc name_en)
            const existingSpecies = await speciesRepository.findOne({
                where: [
                    { name_vi: speciesItem.name_vi },
                    { name_en: speciesItem.name_en }
                ]
            });

            if (existingSpecies) {
                console.log(`⏭️  Species already exists: ${speciesItem.name_vi} / ${speciesItem.name_en}`);
                continue;
            }

            const species = speciesRepository.create(speciesItem);
            await speciesRepository.save(species);
            console.log(`✓ Created species: ${species.name_vi} / ${species.name_en}`);
        }

        console.log('Species seeding completed!');
    }
}
