import { reportsModel } from "../models/reportsModel.js";

export const reportsController = {
  async getAll(req, res) {
    try {
      const meds = await reportsModel.getAll();
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};