import type { Document, Model, Types } from 'mongoose';
import type { TEmail, TUserRole } from '../../types';

export interface IUser {
	name: string;
	email: TEmail;
	password: string;
	image: string;
	role: TUserRole;
	is_active?: boolean;
}

export interface ILoginCredentials {
	email: TEmail;
	password: string;
}

export interface ITokens {
	access_token: string;
	refresh_token: string;
	user: ICurrentUser;
}

export interface IUserDoc extends IUser, Document {
	_id: Types.ObjectId;
}

export interface IUserModel extends Model<IUserDoc> {
	validateUser(email?: TEmail): Promise<IUserDoc>;
}

export interface ICurrentUser extends Omit<IUser, 'password'> {
	_id: Types.ObjectId;
	created_at: string;
	updated_at: string;
}
