import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AgeUnit, Gender, TransactionType } from "../pet.entity";

export class OwnerInfoDto {
    @ApiProperty({ description: 'ID chủ sở hữu' })
    id: string;

    @ApiProperty({ description: 'Tên chủ sở hữu' })
    name: string;

    @ApiPropertyOptional({ description: 'Avatar chủ sở hữu' })
    avatar?: string;

    @ApiPropertyOptional({ description: 'Số điện thoại' })
    phone?: string;

    @ApiPropertyOptional({ description: 'Email' })
    email?: string;

    @ApiPropertyOptional({ description: 'Địa chỉ' })
    address?: string;

    @ApiProperty({ description: 'Đánh giá trung bình' })
    rating: number;

    @ApiProperty({ description: 'Đã xác thực' })
    verified: boolean;

    @ApiProperty({ description: 'Thành viên từ' })
    memberSince: Date;
}

export class SpeciesInfoDto {
    @ApiProperty({ description: 'ID loài' })
    id: string;

    @ApiProperty({ description: 'Tên loài (tiếng Việt)' })
    nameVi: string;

    @ApiProperty({ description: 'Tên loài (tiếng Anh)' })
    nameEn: string;
}

export class BreedInfoDto {
    @ApiProperty({ description: 'ID giống' })
    id: string;

    @ApiProperty({ description: 'Tên giống (tiếng Việt)' })
    nameVi: string;

    @ApiProperty({ description: 'Tên giống (tiếng Anh)' })
    nameEn: string;
}

export class DetailPetDto {
    @ApiProperty({ description: 'ID của thú cưng' })
    id: string;

    @ApiProperty({ description: 'Tên thú cưng' })
    name: string;

    @ApiProperty({ description: 'Tuổi' })
    age: number;

    @ApiProperty({ description: 'Đơn vị tuổi', enum: AgeUnit })
    ageUnit: AgeUnit;

    @ApiProperty({ description: 'Giới tính', enum: Gender })
    gender: Gender;

    @ApiProperty({ description: 'Cân nặng (kg)' })
    weight: number;

    @ApiPropertyOptional({ description: 'Mô tả' })
    description?: string;

    @ApiPropertyOptional({ description: 'Danh sách ảnh', type: [String] })
    images?: string[];

    @ApiProperty({ description: 'Thông tin loài', type: SpeciesInfoDto })
    species: SpeciesInfoDto;

    @ApiPropertyOptional({ description: 'Thông tin giống', type: BreedInfoDto })
    breed?: BreedInfoDto;

    @ApiPropertyOptional({ description: 'Tên giống tự nhập' })
    customBreedName?: string;

    @ApiProperty({ description: 'Đã tiêm vaccine' })
    vaccinated: boolean;

    @ApiProperty({ description: 'Có phải để cho không' })
    isForRehoming: boolean;

    @ApiProperty({ description: 'Loại giao dịch', enum: TransactionType })
    transactionType: TransactionType;

    @ApiPropertyOptional({ description: 'Giá (VNĐ)' })
    price?: number;

    @ApiProperty({ description: 'Đánh giá trung bình' })
    rating: number;

    @ApiProperty({ description: 'Lượt xem' })
    view: number;

    @ApiProperty({ description: 'Thông tin chủ sở hữu', type: OwnerInfoDto })
    owner: OwnerInfoDto;

    @ApiProperty({ description: 'Ngày tạo' })
    createdAt: Date;

    @ApiProperty({ description: 'Ngày cập nhật' })
    updatedAt: Date;
}