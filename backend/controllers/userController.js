import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

// api to register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing Details...' })
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered! Login instead.'
      })
    }

    //   validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Enter a Valid Email !!' })
    }

    //   validating strong password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be Strong!'
      })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.status(201).json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Registration failed! Try again.'
    })
  }
}

// api to login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing Details...' })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Enter a Valid Email.' })
    }

    // find user by email in database
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Account not found! Try Again.'
      })
    }

    // compare user password with saved password in database
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect Credentials! Try again.'
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.status(200).json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Login failed! Try again.'
    })
  }
}

// api to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')
    res.status(201).json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

//  Api to update User profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing Details...' })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    })

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image'
      })
      const imageUrl = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageUrl })
    }

    res.status(201).json({ success: true, message: 'Profile Updated 🎉' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body
    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: 'Doctor Not Available!' })
    }

    let slots_booked = docData.slots_booked

    // checking for slots availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: 'Slot Not Available!' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // save new slots data in doctors data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.status(201).json({ success: true, message: 'Appointment Booked! 🎉' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Api to get user Appointments for frontend my appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body
    const appointments = await appointmentModel.find({ userId })
    res.status(201).json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Api to Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res
        .status(400)
        .json({ success: false, message: 'Unauthorized Action!' })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })

    res.status(201).json({ success: true, message: 'Appointment Cancelled!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// ---------- RAZORPAY PAYMENT GATEWAY - INTEGRATION -----------

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Api to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled) {
      return res.status(400).json({
        success: false,
        message: 'Appointment Cancelled or Not Found!'
      })
    }

    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId
    }

    // creation of an order
    const order = await razorpayInstance.orders.create(options)
    res.status(201).json({ success: true, order })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// Api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

    if (orderInfo.status === 'paid') {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true
      })
      res.status(201).json({ success: true, message: 'Payment Successful! 🎉' })
    } else {
      res.status(401).json({ success: false, message: 'Payment Failed...' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

// export all user controllers
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
}
