import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from '@/modules/alumnus/alumnus.constants';
import { createPartialSchema } from '@/utilities/zodPartialSchema';
import { z } from 'zod';

const personalInfoSchema = z.object({
	full_name: z.string({ error: 'Full name is required' }).min(1, 'Full name is required'),
	date_of_birth: z
		.string({ error: 'Date of birth is required' })
		.min(1, 'Date of birth is required'),
	gender: z.enum(GENDERS, {
		message: 'Invalid gender',
	}),
	image: z.url({ error: 'Valid image URL is required' }),
	nationality: z
		.string({ error: 'Nationality is required' })
		.min(1, 'Nationality is required'),
	blood_group: z.enum(BLOOD_GROUPS, {
		message: 'Invalid blood group',
	}),
});

const contactInfoSchema = z.object({
	email: z.email('Invalid email address'),
	phone: z
		.string({ error: 'Phone number is required!' })
		.regex(/^\d+$/, 'Phone must be a numeric string!'),
	current_address: z.string().optional(),
});

const academicInfoSchema = z.object({
	student_id: z
		.union([
			z
				.string()
				.regex(/^\d+$/, 'Student ID must be numeric!')
				.refine((val) => val.length >= 12, {
					message: 'Student ID must be at least 12 digits long!',
				}),
			z.number().refine((val) => val.toString().length >= 12, {
				message: 'Student ID must be at least 12 digits long!',
			}),
		])
		.transform((val) => val.toString()),
	degree_earned: z
		.enum(DEGREES, {
			message: 'Invalid degree!',
		})
		.default('BA'),
	graduation_year: z
		.number({ error: 'Graduation year is required!' })
		.int('Graduation year must be an integer!'),
	focus_area: z.string().optional(),
});

const employmentInfoSchema = z
	.object({
		current_employer: z
			.string({ error: 'Current employer name is required' })
			.min(1, 'Current employer is required'),
		job_title: z
			.string({ error: 'Job title is required' })
			.min(1, 'Job title is required'),
		sector: z.string({ error: 'Sector is required' }).min(1, 'Sector is required'),
		work_location: z
			.string({ error: 'Work location is required' })
			.min(1, 'Work location is required'),
	})
	.partial();

export const creationSchema = z
	.object({
		personal_info: personalInfoSchema,
		contact_info: contactInfoSchema,
		academic_info: academicInfoSchema,
		employment_info: employmentInfoSchema.optional(),
		participation: z.enum(PARTICIPATION, {
			message: 'Invalid participation type',
		}),
		interest: z
			.string({ error: 'Interest is required' })
			.min(1, 'Interest is required'),
	})
	.strict();

const updateSchema = createPartialSchema(creationSchema).strict();

export const alumnusValidations = { creationSchema, updateSchema };
