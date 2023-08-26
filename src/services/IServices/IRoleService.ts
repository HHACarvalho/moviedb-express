import { Result } from '../../core/result';
import IRoleDTO from '../../dtos/IRoleDTO';

export default interface IRoleService {
	createRole(reqBody: any): Promise<Result<IRoleDTO>>;

	checkPermissions(cookie: string, requiredPermissions: number[]): Promise<Result<any>>;

	findAllRoles(): Promise<Result<IRoleDTO[]>>;

	updateRole(name: string, reqBody: any): Promise<Result<IRoleDTO>>;

	deleteRole(name: string): Promise<Result<IRoleDTO>>;
}
