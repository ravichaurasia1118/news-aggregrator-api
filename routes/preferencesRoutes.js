var express = require('express');
const { fetchPreferencesController, updatePreferencesController } = require('../controllers/preferencesController');
const router = express.Router();
router.get("/fetch", fetchPreferencesController);
router.put("/edit", updatePreferencesController);

module.exports = router