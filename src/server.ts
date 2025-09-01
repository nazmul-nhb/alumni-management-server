import configs from '@/configs';
import { connectDB } from '@/configs/db';
import type { Server } from 'http';
import { Stylog } from 'nhb-toolbox/stylog';
import app from './app';

let server: Server;

const bootStrap = async () => {
	try {
		// Connect to DB
		await connectDB();

		// Listen to the Server
		server = app.listen(configs.port, () => {
			Stylog.yellow.log(`👂 Server is Listening on Port: ${configs.port}`);
		});
	} catch (error) {
		if (error instanceof Error) {
			Stylog.error.log(`🚫 Error Occurred: ${error.message}`);
		} else {
			Stylog.error.log('🛑 Unknown Error Occurred!');
		}
	}
};

bootStrap().catch(console.dir);

process.on('unhandledRejection', () => {
	Stylog.error.log(`🚫 Unhandled Rejection Detected!\n🛑 Server is Shutting Down...`);

	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}

	process.exit(1);
});

process.on('uncaughtException', () => {
	Stylog.error.log(`🚫 Uncaught Exception Detected!\n🛑 Server is Shutting Down...`);

	process.exit(1);
});
