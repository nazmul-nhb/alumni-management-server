import { Schema, model } from 'mongoose';
import type { IAlumnusDoc } from './alumnus.types';
import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';

const alumnusSchema = new Schema<IAlumnusDoc>(
	{
		personalInfo: {
			fullName: { type: String, required: true },
			dateOfBirth: { type: String, required: true },
			gender: {
				type: String,
				enum: GENDERS,
				required: true,
			},
			nationality: { type: String, required: true },
			bloodGroup: {
				type: String,
				enum: BLOOD_GROUPS,
				required: true,
			},
		},
		contactInfo: {
			email: { type: String, required: true, unique: true },
			phone: { type: String, required: true },
			currentAddress: { type: String },
		},
		academicInfo: {
			studentID: { type: Number || String },
			degreeEarned: {
				type: String,
				enum: DEGREES,
				required: true,
				default: 'BA',
			},
			graduationYear: { type: Number, required: true },
			focusArea: { type: String },
		},
		employmentInfo: {
			currentEmployer: { type: String },
			jobTitle: { type: String },
			sector: { type: String },
			workLocation: { type: String },
		},
		participation: {
			type: String,
			enum: PARTICIPATION,
			required: true,
		},
		interest: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
		collection: 'alumni',
	}
);

export const Alumnus = model<IAlumnusDoc>('Alumnus', alumnusSchema);
