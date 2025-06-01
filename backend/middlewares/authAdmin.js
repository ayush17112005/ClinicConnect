import jwt from "jsonwebtoken";

//admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    const expectedPayLoad = { email: process.env.ADMIN_EMAIL };
    if (token_decode.email !== expectedPayLoad.email) {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.json({ success: "false", message: err.message });
  }
};

export default authAdmin;
