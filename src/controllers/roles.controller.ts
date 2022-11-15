import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Req,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { RolesInterface} from '../interfaces/roles.interface';

@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService) { }

    @Get()
    findAll(): Promise<RolesInterface[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<RolesInterface> {
        return this.roleService.findOne(id);
    }

    @Post()
    create(@Body() createRoleDto): Promise<RolesInterface> {
        return this.roleService.create(createRoleDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<RolesInterface> {
        return this.roleService.delete(id);
    }

    @Put(':id')
    update(@Body() updateRoleDto, @Param('id') id): Promise<RolesInterface> {
        return this.roleService.update(id, updateRoleDto);
    }

    // @Patch(':id')
    // findByIdAndToggleEnable(@Param('id') id): Promise<RolesInterface> {
    //     return this.RoleService.findByIdAndToggleEnable(id);
    // }
}
