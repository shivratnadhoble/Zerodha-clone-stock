const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    fullName: {
        type: String,
        required: [true, "Your full name is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Modern Async Middleware for Password Hashing
// We remove the 'next' parameter to avoid the "next is not a function" error
// encountered in some newer Mongoose versions when combined with async/await.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err; // Mongoose will handle this as a validation/save error
    }
});

module.exports = mongoose.model("User", userSchema);
