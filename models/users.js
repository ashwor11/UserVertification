const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema



const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    biography:{
        type:String,
        default: ""
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    profilePhoto:{
        type:String,
        default: "profile.svg"
    },
    followers:{
        type: [String],
        required: true,
        default: []
    },
    followings:{
        type: [String],
        required: true,
        default: []
    },
    likedPhotos:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    photos:{
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    }

    


})

userSchema.statics.login = async function(username, email, password){

    const user = await this.findOne({$or:[{'email':email},{'username':username}]})
    if(!user){
        throw Error("Wrong password or username")
    }else{
        const auth = await bcrypt.compare(password,user.password);

        if(!auth){
            throw Error("Wrong password or username")
        }
    }
      
    
    return user;
}


userSchema.pre('save', async function(next){

    if(this.isModified('password')){
        console.log("xd");
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password,salt)
    }
    
    next()
})

const User = new mongoose.model('user', userSchema);

module.exports = User;