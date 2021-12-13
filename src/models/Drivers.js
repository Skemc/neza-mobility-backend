/* eslint-disable func-names */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { toJSON } from './plugins';

const { Schema } = mongoose;

const DriverSchema = new Schema(
    {
        driverID: {
            type: String,
            maxlength: 255,
            required: true,
            unique: true,
            trim: true,
        },
        firstName: {
            type: String,
            maxlength: 255,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            maxlength: 255,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            maxlength: 24,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            maxlength: 255,
            unique: true,
            trim: true,
            default: null,
        },
        userType: {
            type: String,
            required: true,
            default: 'driver',
        },
        isVerified: {
            type: Boolean,
            defaultValue: false,
            allowNull: false
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

// add plugin that converts mongoose to json
DriverSchema.plugin(toJSON);

DriverSchema.virtual('id').get(function () {
    // eslint-disable-next-line no-underscore-dangle
    return this._id.toHexString();
});

DriverSchema.statics.isEmailUsed = async function (
    email,
    excludeDriverId,
) {
    const driver = await this.findOne({
        email,
        _id: { $ne: excludeDriverId },
    });
    return !!driver;
};

DriverSchema.statics.isPhoneNumberUsed = async function (
    phoneNumber,
    excludeDriverId,
) {
    const driver = await this.findOne({
        phoneNumber,
        _id: { $ne: excludeDriverId },
    });
    return !!driver;
};


DriverSchema.statics.isIdUsed = async function (
    driverID,
    excludeDriverId,
) {
    const driver = await this.findOne({
        driverID,
        _id: { $ne: excludeDriverId },
    });
    return !!driver;
};

DriverSchema.pre('save', async function (next) {
    const driver = this;
    if (driver.isModified('password')) {
        driver.password = await bcrypt.hash(driver.password, 10);
    }
    next();
});

DriverSchema.methods.isPasswordMatch = async function (password) {
    const driver = this;
    return bcrypt.compare(password, driver.password);
};

DriverSchema.set('toObject', {
    getters: true,
});

const Driver = mongoose.model('Driver', DriverSchema);

export default Driver;
