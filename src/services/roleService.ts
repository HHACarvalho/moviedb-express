import config from '../../config';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import { Result } from '../core/result';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

import { Inject, Service } from 'typedi';

@Service()
export default class RoleService implements IRoleService {
	constructor(@Inject(config.repos.role) private repoInstance: IRoleRepo) {}

	public async createRole(reqBody: any): Promise<Result<IRoleDTO>> {
		const roleExists = await this.repoInstance.findRole(reqBody.name);
		if (roleExists) {
			return Result.fail<IRoleDTO>('Role with the name "' + reqBody.name + '" already exists');
		}

		const role = Role.create({
			name: reqBody.name,
			permissions: reqBody.permissions,
		});

		const result = await this.repoInstance.createRole(role);
		return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
	}

	public async findAllRoles(): Promise<Result<IRoleDTO[]>> {
		const roleList = await this.repoInstance.findAllRoles();
		if (roleList.length === 0) {
			return Result.fail<IRoleDTO[]>('There are no roles');
		}

		return Result.ok<IRoleDTO[]>(roleList.map((e) => RoleMapper.toDTO(e)));
	}

	public async updateRole(roleName: string, reqBody: any): Promise<Result<IRoleDTO>> {
		const role = await this.repoInstance.findRole(roleName);
		if (!role) {
			return Result.fail<IRoleDTO>('No role with the name "' + roleName + '" was found');
		}

		role.permissions = reqBody.permissions;

		const result = await this.repoInstance.updateRole(role);
		return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
	}

	public async deleteRole(roleName: string): Promise<Result<IRoleDTO>> {
		const roleExists = await this.repoInstance.findRole(roleName);
		if (!roleExists) {
			return Result.fail<IRoleDTO>('No role with the id "' + roleName + '" was found');
		}

		const result = await this.repoInstance.deleteRole(roleName);
		return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
	}
}
