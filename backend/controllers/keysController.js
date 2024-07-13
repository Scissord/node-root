import * as Keys from '../models/keys.js';

export const updateText = async (req, res) => {
	try {
		for(const key of req.body) {
			await Keys.update(key.id, { value: key.value });
		}

		res.status(200).json({ message: 'Successfully' });
	}	catch (err) {
		console.log("Error in update templates controller", err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
