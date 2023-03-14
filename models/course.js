const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title      : {
    type    : String,
    required: true,
    unique  : true
  },
  description: {
    type    : String,
    required: true
  },
  maxStudents: {
    type   : Number,
    default: 0,
    min    : [ 0, "Un cours ne peut pas avoir un nombre négatif d'étudiants" ]
  },
  cost       : {
    type   : Number,
    default: 0,
    min    : [ 0, "Le prix du cours ne peut pas être négatif" ]
  },
},
    {
  timestamps: true
})

module.exports = mongoose.model('Course', courseSchema);