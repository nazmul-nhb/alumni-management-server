import type { Document, Types } from 'mongoose';

export interface ITest {
	// Define interface
	property: 'Define types';
}

export interface ITestDoc extends ITest, Document {
	_id: Types.ObjectId;
}
