import { ErrorWithStatus } from '@/classes/ErrorWithStatus';
import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from '@/modules/alumnus/alumnus.constants';
import type { IAlumnusDoc, IAlumnusModel } from '@/modules/alumnus/alumnus.types';
import { Schema, model } from 'mongoose';
import { STATUS_CODES } from 'nhb-toolbox/constants';

const alumnusSchema = new Schema<IAlumnusDoc>(
	{
		personal_info: {
			full_name: { type: String, required: true },
			date_of_birth: { type: String, required: true },
			gender: {
				type: String,
				enum: GENDERS,
				required: true,
			},
			image: { type: String, required: true },
			nationality: { type: String, required: true },
			blood_group: {
				type: String,
				enum: BLOOD_GROUPS,
				required: true,
			},
		},
		contact_info: {
			email: { type: String, required: true, unique: true },
			phone: { type: String, required: true },
			current_address: { type: String },
		},
		academic_info: {
			student_id: { type: Number || String },
			degree_earned: {
				type: String,
				enum: DEGREES,
				required: true,
				default: 'BA',
			},
			graduation_year: { type: Number, required: true },
			focus_area: { type: String },
		},
		employment_info: {
			current_employer: { type: String },
			job_title: { type: String },
			sector: { type: String },
			work_location: { type: String },
		},
		participation: {
			type: String,
			enum: PARTICIPATION,
			required: true,
		},
		interest: { type: String, required: true },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		versionKey: false,
		collection: 'alumni',
	}
);

alumnusSchema.statics.findAlumnusById = async function (id: string) {
	if (!id) {
		throw new ErrorWithStatus(
			'Bad Request',
			'Please provide a valid ID!',
			STATUS_CODES.BAD_REQUEST,
			'alumnus'
		);
	}

	const alumnus = await this.findById(id);

	if (!alumnus) {
		throw new ErrorWithStatus(
			'Not Found Error',
			`No alumnus found with ID ${id}!`,
			STATUS_CODES.NOT_FOUND,
			'alumnus'
		);
	}

	return alumnus;
};

export const Alumnus = model<IAlumnusDoc, IAlumnusModel>('Alumni', alumnusSchema);
