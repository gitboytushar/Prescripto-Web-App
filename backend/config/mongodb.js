import mongoose from 'mongoose'

const connetDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database Connected!'))

  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}

export default connetDB
