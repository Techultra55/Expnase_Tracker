const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// This schema defines the structure of the User document in MongoDB
const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null }
    },
    {
        timestamps: true
    }
);

//hash the password before saving the user document
userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User',userSchema);