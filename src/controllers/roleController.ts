import { TYPES } from '../../config';
import CoreController from './coreController';
import IRoleService from '../services/IServices/IRoleService';

import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export default class RoleController extends CoreController {
	private roleService: IRoleService;

	constructor(@inject(TYPES.IRoleService) roleService: IRoleService) {
		super();
		this.roleService = roleService;
	}

	public registerRoutes(): Router {
		const router = Router();

		router.post('', this.createRole.bind(this));
		router.get('/all', this.findAllRoles.bind(this));
		router.get('/search', this.findRoles.bind(this));
		router.get('/', this.findOneRole.bind(this));
		router.put('', this.updateRole.bind(this));
		router.delete('', this.deleteRole.bind(this));

		return router;
	}

	private async createRole(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.createRole(req.body), res);
	}

	private async findAllRoles(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.findAllRoles(), res);
	}

	private async findRoles(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.findRoles('Example'), res);
	}

	private async findOneRole(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.findOneRole('ExampleRole'), res);
	}

	private async updateRole(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.updateRole('ExampleRole', req.body), res);
	}

	private async deleteRole(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.deleteRole('ExampleRole'), res);
	}
}

//import { z } from 'zod';

// const roleCreateBody = z.object({
// 	name: z.string().min(2).max(32),
// 	permissions: z.array(z.string())
// });
