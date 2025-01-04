import { Initial } from "../models/Initial";

// Create a resource (POST /resource)
export const createResource = async (req, res) => {
  try {
    const newItem = await Initial.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create resource',
      error: error.message,
    });
  }
};

// Get all resources (GET /resource)
export const getAllResources = async (req, res) => {
  try {
    const items = await Initial.find();

    res.status(200).json({
      success: true,
      message: 'Resources fetched successfully',
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resources',
      error: error.message,
    });
  }
};

// Get resource by ID (GET /resource/:id)
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Initial.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: { id },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resource fetched successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch resource',
      error: error.message,
    });
  }
};

// Update resource by ID (PUT /resource/:id)
export const updateResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await Initial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: { id },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update resource',
      error: error.message,
    });
  }
};

// Delete resource by ID (DELETE /resource/:id)
export const deleteResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Initial.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
        error: { id },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete resource',
      error: error.message,
    });
  }
};