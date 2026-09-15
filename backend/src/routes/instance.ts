import express from "express";
import getHealth from "../controllers/instance/health";
import getInstanceStats from "../controllers/instance/stats";
import getInstanceVersion from "../controllers/instance/version";

const router = express.Router();

router.get("/health", getHealth);
router.get("/stats", getInstanceStats);
router.get("/version", getInstanceVersion);

export default router;
