import doctorModel from '../models/doctorModel.js'

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

export { changeAvailability, doctorList }
