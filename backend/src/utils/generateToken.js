import jwt from 'jsonwebtoken';

const generateToken = async (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json("Failed to create token");
  }
};

export default generateToken;