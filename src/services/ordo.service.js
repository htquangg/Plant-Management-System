const httpStatus = require('http-status');
const { Ordo } = require('../models');
const ApiError = require('../utils/ApiError');
const { getClassisById } = require('./classis.service');
const { getClassisByName } = require('./classis.service');

const createOrdo = async (data) => {
  if (await Ordo.isOrdoTaken(data.Ten_KH)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ordo already taken');
  }

  const classis = await getClassisById(data.idLop);
  if (!classis) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }

  const ordoDoc = Ordo.create({
    ...data,
    idLop: data.idLop,
  });

  return ordoDoc;
};

const queryOrdos = async (filter, options) => {
  const ordos = await Ordo.paginate(filter, options);
  return ordos;
};

const getOrdoById = async (id) => {
  return Ordo.findById(id);
};

const updateOrdoById = async (ordoId, updateBody) => {
  const ordo = await getOrdoById(ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  if (updateBody.Ten_KH && (await Ordo.isOrdoTaken(updateBody.Ten_KH, ordoId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Ordo already taken');
  }
  if (updateBody.idLop) {
    const classis = await getClassisById(updateBody.idLop);
    if (!classis) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
    }
  }
  Object.assign(ordo, updateBody);
  await ordo.save();
  return ordo;
};

const deleteOrdoById = async (ordoId) => {
  const ordo = await getOrdoById(ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  await ordo.remove();
  return ordo;
};

const eraseOrdoById = async (ordoId, eraser) => {
  const ordo = await getOrdoById(ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  await ordo.delete(eraser);
  return ordo;
};

const restoreOrdoById = async (ordoId) => {
  const ordo = await getOrdoById(ordoId);
  if (!ordo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ordo not found');
  }
  await ordo.restore();
  return ordo;
};

const getOrderByName = async (orderName) => {
  return Ordo.find({ Ten_KH: orderName });
};

const suggestOrderName = async () => {
  return Ordo.find({});
};

const getChildOfClassis = async (classisName) => {
  const classis = await getClassisByName(classisName);
  if (!classis || !classis.length) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classis not found');
  }
  const idClassis = classis[0].id;
  return Ordo.find({ idLop: idClassis });
};

const searchOrder = async (orderName) => {
  return Ordo.find({ Ten_KH: { $regex: orderName } });
};

module.exports = {
  createOrdo,
  queryOrdos,
  getOrdoById,
  updateOrdoById,
  deleteOrdoById,
  eraseOrdoById,
  restoreOrdoById,
  getOrderByName,
  suggestOrderName,
  getChildOfClassis,
  searchOrder,
};
