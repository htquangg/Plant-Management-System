const express = require('express');
const validate = require('../../middlewares/validate');
const speciesValidation = require('../../validations/species.validation');
const speciesController = require('../../controllers/species.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(speciesValidation.createSpecies), speciesController.createSpecies)
  .get(auth(MODES.GET), validate(speciesValidation.getSpeciess), speciesController.getSpeciess);

router
  .route('/:speciesId')
  .get(auth(MODES.GET), validate(speciesValidation.getSpecies), speciesController.getSpecies)
  .patch(auth(MODES.MANAGE), validate(speciesValidation.updateSpecies), speciesController.updateSpecies)
  .delete(auth(MODES.MANAGE), validate(speciesValidation.deleteSpecies), speciesController.deleteSpecies);

module.exports = router;