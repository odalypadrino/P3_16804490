import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (_req, res, _next) {
	res.render("dashboard/index", { title: "Express" });
});

export default router;
