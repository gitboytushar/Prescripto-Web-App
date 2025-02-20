import req from 'express/lib/request.js'
import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body

    const docData = await doctorModel.findById(docId)

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available
    })

    res.status(200).json({ success: true, message: 'Availability Changed!' })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.status(201).json({ success: true, doctors })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

// Api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body
    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.json({ success: false, message: 'Invalid Credentials!' })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      return res.json({ success: false, message: 'Invalid Credentials!' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

// API to get doctor appointments for doctor panal
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body
    const appointments = await appointmentModel.find({ docId })

    res.json({ success: true, appointments })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

// API to mark appointment as completed from doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true
      })
      res.json({ success: true, message: 'Appointment Completed. 🎉' })
    } else {
      res.json({ success: false, message: 'Mark Failed !!' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: `Server error: ${error.message}` })
  }
}

// API to cancel appointment from doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true
      })
      res.json({ success: true, message: 'Appointment Cancelled.' })
    } else {
      res.json({ success: false, message: 'Cancellation Failed !!' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: `Server error: ${error.message}` })
  }
}

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel
}
