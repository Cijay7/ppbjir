import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  async getAll(req, res) {
    try {
      // ambil query param page dan limit
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      if (page <= 0 || limit <= 0) {
        return res.status(400).json({ error: "Page dan limit harus lebih dari 0" });
      }

      const offset = (page - 1) * limit;

      const { data, total } = await MedicationModel.getAll(limit, offset);

      const totalPages = Math.ceil(total / limit);

      res.json({
        page,
        limit,
        total,
        totalPages,
        data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async search(req, res) {
    try {
      const query = req.query.q; // ambil parameter ?q=...
      if (!query) {
        return res.status(400).json({ error: "Query parameter q is required" });
      }

      const meds = await MedicationModel.search(query);
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { price, quantity } = req.body;
    if (price <= 0) {
      return res.status(400).json({ error: "Price tidak boleh kurang dari 0" });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity tidak boleh kurang dari 0" });
    }

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { price, quantity } = req.body;
    if (price <= 0) {
      return res.status(400).json({ error: "Price tidak boleh kurang dari 0" });
    }
    if (quantity <= 0) {
      return res.status(400).json({ error: "Quantity tidak boleh kurang dari 0" });
    }

      const med = await MedicationModel.update(req.params.id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
