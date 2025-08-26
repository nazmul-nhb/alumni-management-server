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
	module: {
		force: false,
		destination: 'src/app/modules',
		defaultTemplate: 'express-mongoose-zod',
		templates: {
			'express-mongoose-zod': {
				createFolder: true,
				destination: 'src/app/modules',
				files: expressMongooseZodTemplate,
			},
		},
		hooks: {
			onComplete: (moduleName) => {
				updateCollection(moduleName);
				updateRoutes(moduleName);
			},
		},
	},
});
