




const serverJsContent = `
      const express = require("express");
      const dotenv = require("dotenv");
      const cors = require("cors");
      
      dotenv.config();
      
      const app = express();
      const PORT = process.env.PORT || 5000;
      
      app.use(cors());
      app.use(express.json());
      
    //   import routes here
    //   const itemRoutes = require('./routes/itemRoutes');
    //   app.use('/api/items', itemRoutes);
      
      app.listen(PORT, () => {
        console.log(\`✅ Server listening on port \${PORT}\`);
      });
`;

const crudContent = `
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
`;

const routeContent = `
// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');
const Crud = require('../genericCrud');

const crud = new Crud(Item);

router.post('/', crud.create);
router.get('/', crud.read);
router.put('/:id', crud.update);
router.delete('/:id', crud.delete);

module.exports = router;
`;

const modelContent = `
// models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
`;

const controllerContent = `
// controllers/itemController.js














module.exports = {};
`;


const globalFunctionsContent = `

const mongoose = require('mongoose');

const formatResponse = (success, data, message = '') => {
    return {
        success,
        data,
        message
    };
}

const throwError = (message, status) => {
    const err = new Error(message)
    err.status = status
    throw err
}

const handleError = (err, res) => {
    console.error(err);
    res.status(err.status || 500).json(formatResponse(false, null, err.message));
}

const isValidObjectId = (id, mongoose) => {
    return mongoose.Types.ObjectId.isValid(id);
}

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
     formatResponse,
     throwError,
     handleError,
     isValidObjectId,
     validateEmail
}
`;

const basePath = process.cwd();

const pages = [{ path: `${basePath}/genericCrud.js`, content: crudContent },
{ path: `${basePath}/routes/itemRoutes.js`, content: routeContent },
{ path: `${basePath}/models/itemModel.js`, content: modelContent },
{ path: `${basePath}/controllers/itemController.js`, content: controllerContent },
{ path: `${basePath}/globalFunctions.js`, content: globalFunctionsContent }
]

module.exports = {
    pages
}