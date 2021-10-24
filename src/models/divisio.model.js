const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const divisioSchema = mongoose.Schema(
  {
    Ten_KH: {
      type: String,
      required: true,
      unique: true,
    },
    Ten_Latin: {
      type: String,
    },
    Ten_TV_Khac: {
      type: String,
    },
    Mo_Ta: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
divisioSchema.plugin(toJSON);
divisioSchema.plugin(paginate);

/**
 * @typedef Divisio
 */
const Divisio = mongoose.model('Divisio', divisioSchema);

module.exports = Divisio;
