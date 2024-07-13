import * as Template from '../models/template.js';
import * as Keys from '../models/keys.js'
import fs from 'fs/promises';
import path from 'path';
import copyDirRecursive from '../helpers/copy_dir.js';

export const get = async (req, res) => {
	try {
    const templates = await Template.getWithBlocks();

		const [headers, blocks, forms, footers] = [[], [], [], []];

		for(const template of templates) {
			for(const block of template.blocks) {
				const keys = await Keys.get(block.id);
				block.keys = keys;
			}

			if(template.type === 0) {
				headers.push(template)
			}
			
			if(template.type === 1) {
				blocks.push(template)
			}

			if(template.type === 2) {
				forms.push(template)
			}

			if(template.type === 3) {
				footers.push(template)
			}
		}

		res.status(200).json({ 
			message: "Successfully",
			headers,
			blocks,
			forms,
			footers
		});
	}	catch (err) {
		console.log("Error in get template controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const create = async (req, res) => {
	try {
			const { projectName } = req.body;
			const templatesDir = './templates';
			const directoryPath = path.join(templatesDir, projectName);

			// create project
			await fs.mkdir(directoryPath);

			// add presets to project
			const presetDir = './preset';
			await copyDirRecursive(presetDir, directoryPath);
			
			res.status(200).json({ projectName });
	} catch (err) {
			console.error("Error in create templates controller", err.message);
			res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteProject = async (req, res) => {
	try {
			const { projectName } = req.body;
			const templatesDir = './templates';
			const directoryPath = path.join(templatesDir, projectName);

			await fs.rm(directoryPath, { recursive: true, force: true });
			
			res.status(200).json({ projectName });
	} catch (err) {
			console.error("Error in create templates controller", err.message);
			res.status(500).json({ error: "Internal Server Error" });
	}
};

export const uploadImage = async (req, res) => {
	try {
		console.log(req.body, req.files);

		res.status(200).json({  });
	}	catch (err) {
		console.log("Error in uploadImage block controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const download = async (req, res) => {
	try {
		const { projectName, header, blocks, forms, footer } = req.body;

		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="./css/reset.css" />
	<title>${projectName}</title>
</head>
<body>
	${header.code}
	${blocks}
	${forms}
	${footer}
</body>
</html>
		`;

		const filePath = path.join('./templates', projectName, 'index.html');
		await fs.writeFile(filePath, html, 'utf8');

		res.status(200).json({ 
			message: "Successfully",
		});
	}	catch (err) {
		console.log("Error in download template controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
