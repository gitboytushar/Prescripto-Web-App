import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Not Authorized! Try Again.'
      })
    }

    // Verify the token and decode its contents
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Adding user ID to the request body
    req.body.userId = decoded.id

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

export default authUser
