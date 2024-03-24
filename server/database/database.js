const mongoose=require('mongoose')

const connectionString="mongodb+srv://husenbasnet:5CS4hLeMFeh2LAlY@chatapp.aylaaha.mongodb.net/?retryWrites=true&w=majority&appName=chatapp"
const connectToDatabse=async()=>{
await mongoose.connect(connectionString)
console.log("database connected")
}
module.exports=connectToDatabse