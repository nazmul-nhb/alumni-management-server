import { Schema, model } from 'mongoose';
import type { ITestDoc } from './test.types';

const testSchema = new Schema<ITestDoc>(
	{
		// Define schema here
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

export const Test = model<ITestDoc>('Test', testSchema);
