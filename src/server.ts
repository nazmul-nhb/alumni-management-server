import chalk from 'chalk';
import { createServer } from 'http';
import app from './app';
import configs from './app/configs';
import { connectDB } from './app/configs/db';

const server = createServer(app);

const bootStrap = async () => {
	try {
		// Connect to DB
		await connectDB();

		// Listen to the Server
		server.listen(configs.port, () => {
			console.info(
				chalk.yellowBright(
					`👂 Server is Listening on Port: ${configs.port}`,
				),
			);
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(chalk.red(`🚫 Error Occurred: ${error.message}`));
		} else {
			console.error(chalk.red('🛑 Unknown Error Occurred!'));
		}
	}
};

bootStrap().catch(console.dir);

process.on('unhandledRejection', () => {
	console.error(
		chalk.redBright(
			`🚫 Unhandled Rejection Detected!\n🛑 Server is Shutting Down...`,
		),
	);

	if (server) {
		server.close(() => {
			process.exit(1);
		});
	}

	process.exit(1);
});

process.on('uncaughtException', () => {
	console.error(
		chalk.redBright(
			`🚫 Uncaught Exception Detected!\n🛑 Server is Shutting Down...`,
		),
	);

	process.exit(1);
});

export default server;
