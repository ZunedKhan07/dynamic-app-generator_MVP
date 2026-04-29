import Data from "../models/Data.model.js";

// CREATE DATA
export const createData = async (req, res) => {
  try {
    const { entity } = req.params;

    // check entity
    if (!entity) {
      return res.status(400).json({
        message: "Entity is required!",
      });
    }

    const existing = await Data.findOne({
        entity,
        "data.title": req.body.title
      });

      if (existing) {
        existing.data = req.body;
        await existing.save();
        return res.json(existing);
    }

    const newData = await Data.create({
      entity,
      data: req.body,
    });

    if (!newData) {
      return res.status(500).json({
        message: "Error creating data",
      });
    }

    return res.status(201).json(newData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET DATA
export const getData = async (req, res) => {
  try {
    const { entity } = req.params;

    if (!entity) {
      return res.status(400).json({
        message: "Entity is required!",
      });
    }

    const data = await Data.find({ entity });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Data.findByIdAndUpdate(
      id,
      { data: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};