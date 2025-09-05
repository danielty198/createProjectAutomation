
// genericCrud.js
const { formatResponse, handleError } = require('./globalFunction');

class Crud {
  constructor(model) {
    this.model = model;
  }

  create = async (req, res) => {
    try {
      const result = await this.model.create(req.body);
      res.json(formatResponse(true, result, 'Created successfully'));
    } catch (err) {
      handleError(err, res);
    }
  };

  read = async (req, res) => {
    try {
      const result = await this.model.find({});
      res.json(formatResponse(true, result, 'Fetched successfully'));
    } catch (err) {
      handleError(err, res);
    }
  };

  update = async (req, res) => {
    try {
      const result = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!result) return res.status(404).json(formatResponse(false, null, 'Not found'));
      res.json(formatResponse(true, result, 'Updated successfully'));
    } catch (err) {
      handleError(err, res);
    }
  };

  delete = async (req, res) => {
    try {
      const result = await this.model.findByIdAndDelete(req.params.id);
      if (!result) return res.status(404).json(formatResponse(false, null, 'Not found'));
      res.json(formatResponse(true, result, 'Deleted successfully'));
    } catch (err) {
      handleError(err, res);
    }
  };
}

module.exports = Crud;
