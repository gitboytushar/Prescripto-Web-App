import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers
    if (!dtoken) {
      return res.status(400).json({
        success: false,
        message: 'Not Authorized! Try Again.'
      })
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

    req.body.docId = token_decode.id

    next()
  } catch (error) {
    console.log(error)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

export default authDoctor
