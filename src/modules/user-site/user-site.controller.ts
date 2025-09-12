import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserSiteService } from './user-site.service';
import { LayoutConfigDto } from './dto/layout-config.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { ICurrentUser } from 'src/common/interfaces/user.interface';

@Controller('user-site')
export class UserSiteController {
    constructor(private readonly userSiteService: UserSiteService) {}

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(':userId/layout-config')
    getLayoutConfigUser(@Param('userId') userId: string) {
        return this.userSiteService.getLayoutConfigUser(userId);
    }

    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Put(':userId/layout-config')
    updateLayoutConfigUser(@Param('userId') userId: string, @Body() layoutConfig: LayoutConfigDto) {
        return this.userSiteService.updateLayoutConfigUser(userId, layoutConfig);
    }
}
