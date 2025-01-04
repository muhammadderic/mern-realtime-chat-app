import express from "express";
const router = express.Router();

import {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
} from "../controllers/initialController.js";

router.post('/create', createResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.put('/:id', updateResourceById);
router.delete('/:id', deleteResourceById);

export default router;