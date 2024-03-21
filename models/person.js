const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = 'mongodb+srv://mikasu:Bebra1945@cluster0.rbfc2gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length >= 3
      },
      message: props => 'Name should be at least three characters long',
    },
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`,
    },
    required: [true, 'Phone number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
