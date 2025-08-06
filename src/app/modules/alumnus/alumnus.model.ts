import { Schema, model } from 'mongoose';
import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';
import type { IAlumnusDoc } from './alumnus.types';

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

export const Alumnus = model<IAlumnusDoc>('Alumni', alumnusSchema);
