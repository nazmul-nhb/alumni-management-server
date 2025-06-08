import type { Document, Types } from 'mongoose';
import type {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';
import type { TEmail } from '../../types';
import type { Numeric } from 'nhb-toolbox/types';

export interface IAlumnus {
	personalInfo: IPersonalInfo;
	contactInfo: IContactInfo;
	academicInfo: IAcademicInfo;
	employmentInfo?: IEmploymentInfo;
	participation: TParticipation;
	interest: string;
}

export type TBloodGroup = (typeof BLOOD_GROUPS)[number];
export type TGender = (typeof GENDERS)[number];
export type TDegree = (typeof DEGREES)[number];
export type TParticipation = (typeof PARTICIPATION)[number];

export interface IPersonalInfo {
	fullName: string;
	dateOfBirth: string;
	gender: TGender;
	nationality: string;
	bloodGroup: TBloodGroup;
}

export interface IContactInfo {
	email: TEmail;
	phone: `${number}`;
	currentAddress?: string;
}

export interface IAcademicInfo {
	studentID?: Numeric;
	degreeEarned: TDegree;
	graduationYear: number;
	focusArea?: string;
}

export interface IEmploymentInfo {
	currentEmployer: string;
	jobTitle: string;
	sector: string;
	workLocation: string;
}

export interface IAlumnusDoc extends IAlumnus, Document {
	_id: Types.ObjectId;
}
