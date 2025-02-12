import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connetDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// -------- app config ----------
const app = express()
const port = process.env.PORT || 4000
connetDB()
connectCloudinary()

// -------- middlewares ---------
app.use(express.json())
app.use(cors())

// ------ api endpoints ------
app.use('/api/admin', adminRouter) // localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter) // localhost:4000/api/admin/list
app.use('/api/user', userRouter) // localhost:4000/api/doctor/register

app.get('/', (req, res) => {
  res.send('API WORKING...')
})

// -------- port listen -------
app.listen(port, () => {
  console.log('Server Running on port', port)
})
