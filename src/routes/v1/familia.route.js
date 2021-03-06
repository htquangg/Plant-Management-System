const express = require('express');
const validate = require('../../middlewares/validate');
const familiaValidation = require('../../validations/familia.validation');
const familiaController = require('../../controllers/familia.controller');
const auth = require('../../middlewares/auth');
const { MODES } = require('../../config/roles');

const router = express.Router();

router
  .route('/')
  .post(auth(MODES.CREATE), validate(familiaValidation.createFamilia), familiaController.createFamilia)
  .get(auth(MODES.GET), validate(familiaValidation.getFamilias), familiaController.getFamilias);

router
  .route('/:familiaId')
  .get(auth(MODES.GET), validate(familiaValidation.getFamilia), familiaController.getFamilia)
  .patch(auth(MODES.MANAGE), validate(familiaValidation.updateFamilia), familiaController.updateFamilia)
  .delete(auth(MODES.MANAGE), validate(familiaValidation.deleteFamilia), familiaController.deleteFamilia);

router
  .route('/:familiaId/:eraser')
  .delete(auth(MODES.MANAGE), validate(familiaValidation.eraseFamiliaById), familiaController.eraseFamilia);

router
  .route('/restore/:familiaId')
  .patch(auth(MODES.GET), validate(familiaValidation.restoreFamilia), familiaController.restoreFamilia);

router
  .route('/getByName/:familiaName')
  .get(auth(MODES.GET), validate(familiaValidation.getFamiliaByName), familiaController.getFamiliaByName);
router
  .route('/suggest/:name')
  .get(auth(MODES.GET), validate(familiaValidation.suggestFamiliaName), familiaController.suggestFamiliaName);

router
  .route('/getChildOfOrdo/:ordoName')
  .get(auth(MODES.GET), validate(familiaValidation.getChildOfOrdo), familiaController.getChildOfOrdo);

router
  .route('/getHistoryFamilia/:familiaId')
  .get(auth(MODES.GET), validate(familiaValidation.getFamilia), familiaController.getHistoryFamilia);

router
  .route('/searchFamilia/:familiaName')
  .get(auth(MODES.GET), validate(familiaValidation.searchFamilia), familiaController.searchFamilia);
module.exports = router;
