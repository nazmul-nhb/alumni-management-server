import type { Document, Types } from 'mongoose';
import type { Numeric } from 'nhb-toolbox/types';
import type { TEmail } from '../../types';
import type {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';

export interface IAlumnus {
	personal_info: IPersonalInfo;
	contact_info: IContactInfo;
	academic_info: IAcademicInfo;
	employment_info?: IEmploymentInfo;
	participation: TParticipation;
	interest: string;
}

export type TBloodGroup = (typeof BLOOD_GROUPS)[number];
export type TGender = (typeof GENDERS)[number];
export type TDegree = (typeof DEGREES)[number];
export type TParticipation = (typeof PARTICIPATION)[number];

export interface IPersonalInfo {
	full_name: string;
	date_of_birth: string;
	gender: TGender;
	nationality: string;
	blood_group: TBloodGroup;
}

export interface IContactInfo {
	email: TEmail;
	phone: `${number}`;
	current_address?: string;
}

export interface IAcademicInfo {
	student_id?: Numeric;
	degree_earned: TDegree;
	graduation_year: number;
	focus_area?: string;
}

export interface IEmploymentInfo {
	current_employer: string;
	job_title: string;
	sector: string;
	work_location: string;
}

export interface IAlumnusDoc extends IAlumnus, Document {
	_id: Types.ObjectId;
	created_at: string;
	updated_at: string;
}
