export default interface IUserPersistence {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
	hidden: boolean;
}
