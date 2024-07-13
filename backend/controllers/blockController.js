import * as Block from '../models/block.js';

export const find = async (req, res) => {
	try {
		const { html_id } = req.params;
		const keys = await Block.getWithKeysByHtmlId(html_id);

		res.status(200).json({ keys });
	}	catch (err) {
		console.log("Error in update templates controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
