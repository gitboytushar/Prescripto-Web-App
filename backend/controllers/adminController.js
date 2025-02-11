import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// Api for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body
    const imageFile = req.file

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: 'Missing Details.' })
    }

    // validating emailing format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please Enter a Valid Email.'
      })
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please Enter a Strong Password. (min. 8 characters)'
      })
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image'
    })
    const imageUrl = imageUpload.secure_url

    // doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.status(201).json({ success: true, message: 'Doctor Added 🎉' })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

// API for the admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      return res.json({ success: true, message: 'Admin Logged In 🎉', token })
    } else {
      return res.json({ success: false, message: 'Invalid Credentials.' })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    res.json({ success: true, doctors })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Server error: ${error.message}` })
  }
}

export { addDoctor, loginAdmin, allDoctors }
