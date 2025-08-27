import {
	BLOOD_GROUPS,
	DEGREES,
	GENDERS,
	PARTICIPATION,
} from '@/modules/alumnus/alumnus.constants';
import { createPartialSchema } from '@/utilities/zodPartialSchema';
import { z } from 'zod';

const currentYear = new Date().getFullYear();

const personalInfoSchema = z.object({
	full_name: z
		.string({ error: 'Full name is required' })
		.min(1, 'Full name cannot be empty!'),
	date_of_birth: z
		.string({ error: 'Date of birth is required' })
		.regex(/^\d{4}-\d{2}-\d{2}$/, {
			error: 'Date of birth must be in YYYY-MM-DD format',
		})
		.refine((val) => !isNaN(Date.parse(val)), {
			error: 'Date of birth must be a valid date',
		}),
	gender: z.enum(GENDERS, {
		error: 'Invalid gender',
	}),
	image: z.url({ error: 'Valid image URL is required' }),
	nationality: z
		.string({ error: 'Nationality is required' })
		.min(1, 'Nationality is required'),
	blood_group: z.enum(BLOOD_GROUPS, {
		error: 'Invalid blood group',
	}),
});

const contactInfoSchema = z.object({
	email: z.email('Invalid email address'),
	phone: z
		.string({ error: 'Phone number is required!' })
		.trim()
		.transform((val) => val.replace(/[\s\-().]/g, ''))
		.check((val) => {
			if (!/^\+?[0-9]\d{1,14}$/.test(val.value)) {
				val.issues.push({
					code: 'custom',
					error: 'Invalid Phone Number',
					message: 'Please provide a valid phone number!',
					input: val.value,
				});
			}
		}),
	current_address: z.string().optional(),
});

const academicInfoSchema = z.object({
	student_id: z
		.union([
			z
				.string()
				.regex(/^\d+$/, 'Student ID must be numeric!')
				.refine((val) => val.length >= 12, {
					error: 'Student ID must be at least 12 digits long!',
				}),
			z.number().refine((val) => val.toString().length >= 12, {
				error: 'Student ID must be at least 12 digits long!',
			}),
		])
		.transform((val) => val.toString()),
	degree_earned: z
		.enum(DEGREES, {
			error: 'Invalid degree!',
		})
		.default('BA'),
	graduation_year: z
		.number({ error: 'Graduation year is required!' })
		.int({ error: 'Graduation year must be an integer!' })
		.min(2002, { error: 'Graduation year must be 2002 or later!' })
		.max(currentYear, { error: `Graduation year cannot be after ${currentYear}!` }),
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
			error: 'Invalid participation type',
		}),
		interest: z
			.string({ error: 'Interest is required' })
			.min(1, 'Interest is required'),
	})
	.strict();

const updateSchema = createPartialSchema(creationSchema).strict();

export const alumnusValidations = { creationSchema, updateSchema };
