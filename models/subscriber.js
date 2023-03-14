const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
      name   : {
        type    : String,
        required: true
      },
      email  : {
        type     : String,
        required : true,
        lowercase: true,
        unique   : true
      },
      zipCode: {
        type: Number,
        min : [ 10000, "Zip code Postal too short" ],
        max : 99999
      },
      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref : "Course"
        }
      ]
    },
    {
      timestamps: true
    })

module.exports = mongoose.model('Subscription', subscriptionSchema);