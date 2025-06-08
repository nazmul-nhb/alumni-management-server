import { z } from 'zod';
import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';

const personalInfoSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	dateOfBirth: z.string().min(1, 'Date of birth is required'),
	gender: z.enum(GENDERS, {
		errorMap: () => ({ message: 'Invalid gender' }),
	}),
	nationality: z.string().min(1, 'Nationality is required'),
	bloodGroup: z.enum(BLOOD_GROUPS, {
		errorMap: () => ({ message: 'Invalid blood group' }),
	}),
});

const contactInfoSchema = z.object({
	email: z.string().email('Invalid email address'),
	phone: z.string().regex(/^\d+$/, 'Phone must be a numeric string'),
	currentAddress: z.string().optional(),
});

const academicInfoSchema = z.object({
	studentID: z
		.union([
			z.number(),
			z.string().regex(/^\d+$/, 'Student ID must be numeric'),
		])
		.transform(Number)
		.optional(),
	degreeEarned: z
		.enum(DEGREES, {
			errorMap: () => ({ message: 'Invalid degree' }),
		})
		.default('BA'),
	graduationYear: z.number().int('Graduation year must be an integer'),
	focusArea: z.string().optional(),
});

const employmentInfoSchema = z
	.object({
		currentEmployer: z.string().min(1, 'Current employer is required'),
		jobTitle: z.string().min(1, 'Job title is required'),
		sector: z.string().min(1, 'Sector is required'),
		workLocation: z.string().min(1, 'Work location is required'),
	})
	.partial()
	.optional();

export const creationSchema = z
	.object({
		personalInfo: personalInfoSchema,
		contactInfo: contactInfoSchema,
		academicInfo: academicInfoSchema,
		employmentInfo: employmentInfoSchema,
		participation: z.enum(PARTICIPATION, {
			errorMap: () => ({ message: 'Invalid participation type' }),
		}),
		interest: z.string().min(1, 'Interest is required'),
	})
	.strict();

export const alumnusValidations = { creationSchema };
