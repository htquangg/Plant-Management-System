const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const historise = require('mongoose-historise');
const { toJSON, paginate } = require('./plugins');

const speciesSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
      required: true,
      unique: true,
    },
    Ten_TV: {
      type: String,
    },
    Dac_Diem_Nhan_Dang: {
      type: String,
    },
    Sinh_Hoc_Sinh_Thai: {
      type: String,
    },
    Phan_Bo: {
      type: String,
    },
    Gia_Tri: {
      type: String,
    },
    Tinh_Trang: {
      type: String,
    },
    Bien_Phap_BV: {
      type: String,
    },
    Dang_Song: {
      type: String,
    },
    idChi: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Genus',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
speciesSchema.plugin(toJSON);
speciesSchema.plugin(paginate);
speciesSchema.plugin(historise, { mongooseInstance: mongoose, mongooseModelName: 'Species', limit: 3 });
speciesSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  deletedByType: String,
  overrideMethods: ['countDocuments', 'find'],
});
// eslint-disable-next-line camelcase
speciesSchema.statics.isSpeciesTaken = async function (Ten_KH, excludeSpeciesId) {
  const speciesExist = await this.findOne({ Ten_KH, _id: { $ne: excludeSpeciesId } });
  return !!speciesExist;
};
/**
 * @typedef Species
 */
const Species = mongoose.model('Species', speciesSchema);

module.exports = Species;
