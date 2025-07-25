const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CMSSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['privacy_policy', 'terms_and_conditions', 'about_us', "how_it_work"],
      required: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

CMSSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CMS', CMSSchema)
