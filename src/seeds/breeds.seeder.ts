import { DataSource } from 'typeorm';
import { Breed } from '../modules/breeds/breed.entity';
import { Species } from '../modules/species/species.entity';

export const breedsData = {
    'Chó': [
        // Giống chó phổ biến tại Việt Nam
        { name_vi: 'Golden Retriever', name_en: 'Golden Retriever', image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Giống chó thân thiện, thông minh và dễ huấn luyện. Phù hợp với gia đình có trẻ em', description_en: 'Friendly, intelligent and easy to train dog breed. Great with children' },
        { name_vi: 'Labrador', name_en: 'Labrador Retriever', image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó săn nước, trung thành và năng động. Rất thông minh và dễ dạy', description_en: 'Water retriever, loyal and energetic. Very intelligent and trainable' },
        { name_vi: 'Poodle', name_en: 'Poodle', image_url: 'https://images.unsplash.com/photo-1616190264687-b7ebf7aa3712?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Giống chó thông minh, lông xoăn và ít rụng lông. Có 3 kích cỡ: toy, miniature, standard', description_en: 'Intelligent breed with curly coat and minimal shedding. Available in toy, miniature, and standard sizes' },
        { name_vi: 'Bulldog Pháp', name_en: 'French Bulldog', image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó nhỏ, tai dựng, mặt dẹt. Tính cách vui vẻ và thân thiện', description_en: 'Small dog with upright ears and flat face. Cheerful and friendly temperament' },
        { name_vi: 'Beagle', name_en: 'Beagle', image_url: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó săn nhỏ, hoạt bát và thân thiện. Có khứu giác rất nhạy bén', description_en: 'Small hunting dog, active and friendly. Excellent sense of smell' },
        { name_vi: 'Chó chăn cừu Đức', name_en: 'German Shepherd', image_url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó to, thông minh và trung thành. Thường được dùng làm chó nghiệp vụ', description_en: 'Large, intelligent and loyal dog. Often used as working dog' },
        { name_vi: 'Chihuahua', name_en: 'Chihuahua', image_url: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Giống chó nhỏ nhất thế giới, sống lâu. Rất gắn bó với chủ', description_en: 'World\'s smallest dog breed, long-lived. Very attached to owner' },
        { name_vi: 'Shiba Inu', name_en: 'Shiba Inu', image_url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó Nhật Bản, độc lập và dũng cảm. Có tính cách mạnh mẽ', description_en: 'Japanese dog, independent and brave. Strong personality' },
        { name_vi: 'Corgi', name_en: 'Welsh Corgi', image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó chân ngắn, thông minh và năng động. Rất trung thành với gia đình', description_en: 'Short-legged dog, intelligent and energetic. Very loyal to family' },
        { name_vi: 'Husky', name_en: 'Siberian Husky', image_url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó kéo xe tuyết, năng động và bền bỉ. Cần vận động nhiều', description_en: 'Sled dog, energetic and enduring. Needs lots of exercise' },
        { name_vi: 'Border Collie', name_en: 'Border Collie', image_url: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó chăn cừu thông minh nhất, rất năng động. Cần kích thích trí tuệ', description_en: 'Most intelligent herding dog, very active. Needs mental stimulation' },
        { name_vi: 'Rottweiler', name_en: 'Rottweiler', image_url: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó to, mạnh mẽ và trung thành. Tính cách bảo vệ gia đình', description_en: 'Large, strong and loyal dog. Protective family temperament' },
        { name_vi: 'Boxer', name_en: 'Boxer', image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó cỡ trung, năng động và vui tươi. Rất thích chơi đùa', description_en: 'Medium-sized, energetic and playful dog. Loves to play' },
        { name_vi: 'Chó Phú Quốc', name_en: 'Phu Quoc Ridgeback', image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Giống chó bản địa Việt Nam, có đường lông ngược trên lưng. Rất trung thành', description_en: 'Native Vietnamese breed with ridge on back. Very loyal' },
        { name_vi: 'Pomeranian', name_en: 'Pomeranian', image_url: 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó nhỏ, lông dài và bông xốp. Tính cách tự tin và hoạt bát', description_en: 'Small dog with long fluffy coat. Confident and lively personality' },
        { name_vi: 'Yorkshire Terrier', name_en: 'Yorkshire Terrier', image_url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó nhỏ, lông dài và mượt. Dũng cảm và thông minh', description_en: 'Small dog with long silky coat. Brave and intelligent' },
        { name_vi: 'Maltese', name_en: 'Maltese', image_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó nhỏ, lông trắng dài. Tính cách hiền lành và thân thiện', description_en: 'Small dog with long white coat. Gentle and friendly temperament' },
        { name_vi: 'Akita', name_en: 'Akita', image_url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó Nhật to, mạnh mẽ và trung thành. Tính cách độc lập', description_en: 'Large Japanese dog, strong and loyal. Independent personality' },
        { name_vi: 'Doberman', name_en: 'Doberman Pinscher', image_url: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó to, thanh lịch và thông minh. Rất trung thành với chủ', description_en: 'Large, elegant and intelligent dog. Very loyal to owner' },
        { name_vi: 'Samoyed', name_en: 'Samoyed', image_url: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chó lông trắng, dày và mềm. Tính cách vui vẻ và thân thiện', description_en: 'Dog with thick white fluffy coat. Cheerful and friendly temperament' }
    ],
    'Mèo': [
        // Giống mèo phổ biến tại Việt Nam
        { name_vi: 'Mèo Anh lông ngắn', name_en: 'British Shorthair', image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo cỡ trung, lông ngắn và dày. Tính cách hiền lành và dễ chăm sóc', description_en: 'Medium-sized cat with short thick coat. Gentle and easy to care for' },
        { name_vi: 'Mèo Ba Tư', name_en: 'Persian Cat', image_url: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lông dài, mặt dẹt và quý phái. Cần chải lông thường xuyên', description_en: 'Long-haired cat with flat face and noble appearance. Needs regular grooming' },
        { name_vi: 'Maine Coon', name_en: 'Maine Coon', image_url: 'https://images.unsplash.com/photo-1573824255110-27e3e34e04b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lớn nhất, lông dài và tai có tua. Tính cách thân thiện và thông minh', description_en: 'Largest cat breed with long coat and tufted ears. Friendly and intelligent' },
        { name_vi: 'Ragdoll', name_en: 'Ragdoll', image_url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lớn, lông dài và mắt xanh. Rất hiền lành và thích được ôm ấp', description_en: 'Large cat with long coat and blue eyes. Very gentle and loves being cuddled' },
        { name_vi: 'Mèo Xiêm', name_en: 'Siamese Cat', image_url: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo thanh mảnh, tai lớn và mắt xanh. Hoạt bát và hay kêu', description_en: 'Slender cat with large ears and blue eyes. Active and vocal' },
        { name_vi: 'Mèo tai cụp Scotland', name_en: 'Scottish Fold', image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo tai cụp xuống, mặt tròn dễ thương. Tính cách hiền lành', description_en: 'Cat with folded ears and round cute face. Gentle temperament' },
        { name_vi: 'Munchkin', name_en: 'Munchkin Cat', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo chân ngắn nhưng rất hoạt bát. Tính cách thân thiện và vui tươi', description_en: 'Short-legged but very active cat. Friendly and cheerful personality' },
        { name_vi: 'Mèo Nga xanh', name_en: 'Russian Blue', image_url: 'https://images.unsplash.com/photo-1559235038-1b0fadb213b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lông xanh xám, mắt xanh lá. Nhút nhát nhưng rất trung thành', description_en: 'Blue-gray coated cat with green eyes. Shy but very loyal' },
        { name_vi: 'Bengal', name_en: 'Bengal Cat', image_url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo có vằn như báo, rất năng động. Thích leo trèo và chơi đùa', description_en: 'Leopard-spotted cat, very energetic. Loves climbing and playing' },
        { name_vi: 'Mèo ta tam thể', name_en: 'Calico', image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo có 3 màu: trắng, đen, cam. Phần lớn là mèo cái', description_en: 'Three-colored cat: white, black, orange. Mostly female' },
        { name_vi: 'Abyssinian', name_en: 'Abyssinian Cat', image_url: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lông ngắn, màu nâu đỏ. Rất hoạt bát và thông minh', description_en: 'Short-haired cat with reddish-brown coat. Very active and intelligent' },
        { name_vi: 'Sphynx', name_en: 'Sphynx Cat', image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo không lông, da nhăn nheo. Tính cách năng động và thân thiện', description_en: 'Hairless cat with wrinkled skin. Energetic and friendly personality' },
        { name_vi: 'Birman', name_en: 'Birman Cat', image_url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lông dài, chân trắng và mắt xanh. Tính cách hiền lành và ôn hòa', description_en: 'Long-haired cat with white paws and blue eyes. Gentle and calm temperament' },
        { name_vi: 'Exotic Shorthair', name_en: 'Exotic Shorthair', image_url: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo mặt dẹt như Ba Tư nhưng lông ngắn. Tính cách hiền lành', description_en: 'Flat-faced like Persian but with short coat. Gentle temperament' },
        { name_vi: 'Mèo Anh lông dài', name_en: 'British Longhair', image_url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Phiên bản lông dài của mèo Anh. Tính cách điềm đạm và dễ chăm sóc', description_en: 'Long-haired version of British cat. Calm and easy to care for' },
        { name_vi: 'American Shorthair', name_en: 'American Shorthair', image_url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo Mỹ lông ngắn, khỏe mạnh và dễ nuôi. Tính cách ôn hòa', description_en: 'American short-haired cat, healthy and easy to raise. Moderate temperament' },
        { name_vi: 'Norwegian Forest Cat', name_en: 'Norwegian Forest Cat', image_url: 'https://images.unsplash.com/photo-1573824255110-27e3e34e04b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo rừng Na Uy, lông dài và dày. Rất mạnh mẽ và thích leo trèo', description_en: 'Norwegian forest cat with long thick coat. Very strong and loves climbing' },
        { name_vi: 'Mèo ta', name_en: 'Domestic Shorthair', image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo bản địa Việt Nam, đa dạng màu sắc. Khỏe mạnh và dễ nuôi', description_en: 'Vietnamese domestic cat with diverse colors. Healthy and easy to raise' },
        { name_vi: 'Tonkinese', name_en: 'Tonkinese Cat', image_url: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lai giữa Xiêm và Burmese. Hoạt bát và thân thiện', description_en: 'Cross between Siamese and Burmese. Active and friendly' },
        { name_vi: 'Himalayan', name_en: 'Himalayan Cat', image_url: 'https://images.unsplash.com/photo-1574231164645-d6f0e8553590?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Mèo lai giữa Ba Tư và Xiêm. Lông dài và có điểm màu', description_en: 'Cross between Persian and Siamese. Long coat with color points' }
    ],
    'Chim': [
        { name_vi: 'Vẹt đuôi dài', name_en: 'Macaw', image_url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chim vẹt lớn có thể học nói, thông minh và đầy màu sắc', description_en: 'Large parrot that can learn to talk, intelligent and colorful' },
        { name_vi: 'Vẹt cockatiel', name_en: 'Cockatiel', image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Vẹt nhỏ có mào, dễ nuôi và thân thiện với con người', description_en: 'Small crested parrot, easy to keep and friendly with humans' },
        { name_vi: 'Chim cảnh kim cương', name_en: 'Diamond Dove', image_url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chim nhỏ xinh, tiếng kêu nhẹ nhàng và dễ chăm sóc', description_en: 'Small beautiful bird with gentle calls, easy to care for' },
        { name_vi: 'Chim cảnh sẻ', name_en: 'Canary', image_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chim nhỏ có tiếng hót rất hay, màu sắc đẹp', description_en: 'Small bird with beautiful song and attractive colors' },
        { name_vi: 'Vẹt tình yêu', name_en: 'Lovebird', image_url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Vẹt nhỏ nhiều màu sắc, thường nuôi theo cặp', description_en: 'Small colorful parrot, usually kept in pairs' },
        { name_vi: 'Chim yến phụng', name_en: 'Zebra Finch', image_url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Chim cảnh nhỏ có vằn, dễ sinh sản và nuôi dưỡng', description_en: 'Small ornamental bird with stripes, easy to breed' }
    ],
    'Cá': [
        { name_vi: 'Cá vàng', name_en: 'Goldfish', image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Loài cá cảnh phổ biến nhất, dễ nuôi và có nhiều dạng', description_en: 'Most popular ornamental fish, easy to keep with many varieties' },
        { name_vi: 'Cá xiêm', name_en: 'Betta Fish', image_url: 'https://images.unsplash.com/photo-1520637836862-4d197d17c92a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Cá đấu Xiêm, màu sắc rực rỡ và vây dài đẹp mắt', description_en: 'Siamese fighting fish with brilliant colors and beautiful long fins' },
        { name_vi: 'Cá guppy', name_en: 'Guppy', image_url: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Cá nhỏ nhiều màu sắc, sinh sản nhanh và dễ chăm sóc', description_en: 'Small colorful fish, fast breeding and easy care' },
        { name_vi: 'Cá neon', name_en: 'Neon Tetra', image_url: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Cá nhỏ có vạch sáng, đẹp khi bơi thành đàn lớn', description_en: 'Small fish with bright stripes, beautiful when swimming in large schools' },
        { name_vi: 'Cá thiên thần', name_en: 'Angelfish', image_url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Cá dẹt có hình dáng thanh lịch và duyên dáng', description_en: 'Flat fish with elegant and graceful appearance' },
        { name_vi: 'Cá chép Nhật', name_en: 'Koi Fish', image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', description_vi: 'Cá chép Nhật lớn, nhiều màu sắc và sống rất lâu', description_en: 'Large Japanese carp with many colors and very long lifespan' }
    ]
};

export class BreedsSeeder {
    public static async run(dataSource: DataSource): Promise<void> {
        const breedRepository = dataSource.getRepository(Breed);
        const speciesRepository = dataSource.getRepository(Species);

        console.log('Seeding breeds data...');

        // Lấy tất cả species
        const allSpecies = await speciesRepository.find();

        for (const species of allSpecies) {
            const breedsForSpecies = breedsData[species.name_vi];
            
            if (breedsForSpecies) {
                console.log(`Creating breeds for ${species.name_vi} / ${species.name_en}...`);
                
                for (const breedData of breedsForSpecies) {
                    // Kiểm tra xem breed đã tồn tại chưa
                    const existingBreed = await breedRepository.findOne({
                        where: [
                            { name_vi: breedData.name_vi, species: { id: species.id } },
                            { name_en: breedData.name_en, species: { id: species.id } }
                        ],
                        relations: ['species']
                    });

                    if (existingBreed) {
                        console.log(`  ⏭️  Breed already exists: ${breedData.name_vi} / ${breedData.name_en}`);
                        continue;
                    }

                    const breed = breedRepository.create({
                        ...breedData,
                        speciesId: species.id,
                        species: species
                    });
                    
                    await breedRepository.save(breed);
                    console.log(`  ✓ Created breed: ${breedData.name_vi} / ${breedData.name_en}`);
                }
            }
        }

        console.log('Breeds seeding completed!');
    }
}
