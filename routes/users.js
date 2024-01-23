var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/test", async (req, res) => {
	try {
		const topiq = req.app.locals.database.collection('topiq')
		const data = await topiq.find().toArray();

		res.json(data)
	} catch (error) {
		console.error('Error fetch test:', error);
		res.status(500).json({ error: 'Interval Server Error'})
	}
});

module.exports = router;
