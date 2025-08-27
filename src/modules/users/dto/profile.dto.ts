export class ProfileDto {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    description: string;
    rating: number;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;

    postCount: number;
    petCount: number;
    totalPetsSold: number
}
