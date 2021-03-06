const express = require('express');
const validate = require('../../middlewares/validate');
const genusValidation = require('../../validations/genus.validation');
const genusController = require('../../controllers/genus.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(genusValidation.createGenus), genusController.createGenus)
  .get(auth(MODES.GET), validate(genusValidation.getGenuss), genusController.getGenuss);

router
  .route('/:genusId')
  .get(auth(MODES.GET), validate(genusValidation.getGenus), genusController.getGenus)
  .patch(auth(MODES.MANAGE), validate(genusValidation.updateGenus), genusController.updateGenus)
  .delete(auth(MODES.MANAGE), validate(genusValidation.deleteGenus), genusController.deleteGenus);

router
  .route('/:genusId/:eraser')
  .delete(auth(MODES.MANAGE), validate(genusValidation.eraseGenusById), genusController.eraseGenus);

router
  .route('/restore/:genusId')
  .patch(auth(MODES.GET), validate(genusValidation.restoreGenus), genusController.restoreGenus);

router
  .route('/getByName/:genusName')
  .get(auth(MODES.GET), validate(genusValidation.getGenusByName), genusController.getGenusByName);
router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(genusValidation.suggestGenusName), genusController.suggestGenusName);

router
  .route('/getChildOfFamilia/:familiaName')
  .get(auth(MODES.GET), validate(genusValidation.getChildOfFamilia), genusController.getChildOfFamilia);

router
  .route('/getHistoryGenus/:genusId')
  .get(auth(MODES.GET), validate(genusValidation.getGenus), genusController.getHistoryGenus);

router
  .route('/searchGenus/:genusName')
  .get(auth(MODES.GET), validate(genusValidation.searchGenus), genusController.searchGenus);
module.exports = router;
