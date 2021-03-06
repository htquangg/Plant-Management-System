const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFamilia = {
  body: Joi.object().keys({
    Ten_KH: Joi.string().required(),
    Ten_TV: Joi.string(),
    Mo_Ta: Joi.string(),
    idBo: Joi.string().custom(objectId).required(),
  }),
};

const getFamilias = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    deleted: Joi.number().integer(),
  }),
};

const getFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
  }),
};

const updateFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Ten_KH: Joi.string(),
      Ten_TV: Joi.string(),
      Mo_Ta: Joi.string(),
      idBo: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
  }),
};

const eraseFamiliaById = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
    eraser: Joi.string(),
  }),
};

const restoreFamilia = {
  params: Joi.object().keys({
    familiaId: Joi.string().custom(objectId),
  }),
};

const getFamiliaByName = {
  params: Joi.object().keys({
    familiaName: Joi.string(),
  }),
};

const suggestFamiliaName = {
  params: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getChildOfOrdo = {
  params: Joi.object().keys({
    ordoName: Joi.string(),
  }),
};

module.exports = {
  createFamilia,
  getFamilias,
  getFamilia,
  updateFamilia,
  deleteFamilia,
  eraseFamiliaById,
  restoreFamilia,
  getFamiliaByName,
  suggestFamiliaName,
  getChildOfOrdo,
};
