import User from '../models/User';

export default class UserController {
  static create(req, res) {
    const user = new User({
      fullName: 'Full name',
      phoneNumber: 'Phone number',
      email: 'Email',
      address: 'Address',
      truckType: 'Truck type',
      operationArea: 'Operation area',
      userName: 'Username',
      password: 'Password',
      userType: 'Client || Driver',
    });
    user.save((err, users) => {
      if (err) {
        res.status(500).json({
          error: 500,
          message: 'Internal server error',
        });
      }
      res.status(200).json({
        status: 200,
        message: 'User created successfuly',
        data: users,
      });
    });
  }

  static list(req, res) {
    User.find({}).exec((err, users) => {
      if (err) {
        res.status(200).json({
          error: 500,
          message: 'Internal server error',
        });
      }
      res.status(200).json({
        status: 200,
        data: users,
      });
    });
  }
}
