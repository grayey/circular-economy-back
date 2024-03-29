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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from 'src/services/roles.service';
import { RolesInterface } from 'src/interfaces/roles.interface';

@ApiTags('Roles')
@Controller('role')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @Get()
  async getAllRoles(
    @Query() { q, skip, limit, paginate = true, include },
  ): Promise<{ results: RolesInterface[]; count: number }> {
    return await this.roleService.findAll(q, {
      skip,
      limit,
      paginate,
      populate: include,
    });
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

  @Put(':id/permissions')
  assignPermissions(
    @Body() permissionIds: Array<string>,
    @Param('id') id,
  ): Promise<RolesInterface> {
    return this.roleService.assignPermissions(id, permissionIds);
  }

  // @Patch(':id')
  // findByIdAndToggleEnable(@Param('id') id): Promise<RolesInterface> {
  //     return this.RoleService.findByIdAndToggleEnable(id);
  // }
}
