import express from 'express'
import { doctorList } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.route('/list').get(doctorList)

export default doctorRouter
