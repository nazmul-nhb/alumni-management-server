import { z } from 'zod';
import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from './alumnus.constants';

const personalInfoSchema = z.object({
	full_name: z
		.string({ required_error: 'Full name is required' })
		.min(1, 'Full name is required'),
	date_of_birth: z
		.string({ required_error: 'Date of birth is required' })
		.min(1, 'Date of birth is required'),
	gender: z.enum(GENDERS, {
		errorMap: () => ({ message: 'Invalid gender' }),
	}),
	nationality: z
		.string({ required_error: 'Nationality is required' })
		.min(1, 'Nationality is required'),
	blood_group: z.enum(BLOOD_GROUPS, {
		errorMap: () => ({ message: 'Invalid blood group' }),
	}),
});

const contactInfoSchema = z.object({
	email: z
		.string({ required_error: 'Email is required!' })
		.email('Invalid email address'),
	phone: z
		.string({ required_error: 'Phone number is required!' })
		.regex(/^\d+$/, 'Phone must be a numeric string'),
	current_address: z.string().optional(),
});

const academicInfoSchema = z.object({
	student_id: z
		.union([
			z.number(),
			z.string().regex(/^\d+$/, 'Student ID must be numeric'),
		])
		.transform(Number)
		.optional(),
	degree_earned: z
		.enum(DEGREES, {
			errorMap: () => ({ message: 'Invalid degree' }),
		})
		.default('BA'),
	graduation_year: z
		.number({ required_error: 'Graduation year is required!' })
		.int('Graduation year must be an integer'),
	focus_area: z.string().optional(),
});

const employmentInfoSchema = z
	.object({
		current_employer: z
			.string({ required_error: 'Current employer name is required' })
			.min(1, 'Current employer is required'),
		job_title: z
			.string({ required_error: 'Job title is required' })
			.min(1, 'Job title is required'),
		sector: z
			.string({ required_error: 'Sector is required' })
			.min(1, 'Sector is required'),
		work_location: z
			.string({ required_error: 'Work location is required' })
			.min(1, 'Work location is required'),
	})
	.partial()
	.optional();

export const creationSchema = z
	.object({
		personal_info: personalInfoSchema,
		contact_info: contactInfoSchema,
		academic_info: academicInfoSchema,
		employment_info: employmentInfoSchema,
		participation: z.enum(PARTICIPATION, {
			errorMap: () => ({ message: 'Invalid participation type' }),
		}),
		interest: z
			.string({ required_error: 'Interest is required' })
			.min(1, 'Interest is required'),
	})
	.strict();

const updateSchema = creationSchema.partial();

export const alumnusValidations = { creationSchema, updateSchema };
