import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password, userType, carName, carNumber, carModel, carColor } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });

    }
    const user: IUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password,
      userType,
      ...(userType === 'driver' && {
        carDetails: { carName, carNumber, carModel, carColor }
      }),
    });

    if (user) {
      res.status(201).json({
        status: true,
        message: 'User registered successfully',
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    if (error.code === 11000 && error.keyValue) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `An account with this ${field} already exists.` });
    }
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  console.log("phoneNumber", phoneNumber);

  try {
    const user = await User.findOne({ phoneNumber });

    console.log("user", user);
    if (user) {
      res.json({
        status: true,
        message: 'OTP sent successfully'
      });
    } else {
      res.status(404).json({ message: 'User not found', status: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', status: false });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: false });
    }

    // Static OTP for development
    const otp = '123456';

    // In production, you would send this OTP via email/SMS
    // For now, we'll just return it in the response
    res.json({
      message: 'OTP sent successfully',
      otp: otp, // Remove this in production
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', status: false });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: false });
    }

    // Verify the static OTP
    if (otp === '123456') {
      res.json({
        message: 'OTP verified successfully',
        status: true,
        data: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userType: user.userType,
          ...(user.userType === 'driver' && {
            carDetails: user.carDetails
          }),
          token: generateToken(user._id as string),
        },
      });
    } else {
      console.log('Invalid OTP');
      res.status(400).json({ message: 'Invalid OTP', status: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', status: false });
  }
};
