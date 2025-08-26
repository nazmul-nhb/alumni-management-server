// @ts-check

import {
	defineScriptConfig,
	expressMongooseZodTemplate,
	updateCollection,
	updateRoutes,
} from 'nhb-scripts';

export default defineScriptConfig({
	format: {
		args: ['--write'],
		files: ['src', 'nhb.scripts.config.mjs'],
		ignorePath: '.prettierignore',
	},
	lint: { folders: ['src'], patterns: ['**/*.ts'] },
	fix: { folders: ['src'], patterns: ['**/*.ts'] },
	commit: {
		runFormatter: false,
	},
	count: {
		defaultPath: '.',
		excludePaths: ['node_modules', 'dist'],
	},
	build: {
		distFolder: 'dist',
		commands: [{ cmd: 'tsc' }, { cmd: 'tsc-alias' }],
	},
	module: {
		force: false,
		destination: 'src/app/modules',
		defaultTemplate: 'express-mongoose-zod',
		templates: {
			'express-mongoose-zod': {
				createFolder: true,
				destination: 'src/app/modules',
				files: (moduleName) => expressMongooseZodTemplate(moduleName, true),
			},
		},
		hooks: {
			onComplete: (moduleName) => {
				updateCollection(moduleName);
				updateRoutes(moduleName, true);
			},
		},
	},
});
