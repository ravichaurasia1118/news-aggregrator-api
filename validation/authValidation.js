const { __ } = require("i18n");

let emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let userSchema = {
   fullName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      isValidate: true,
      validation: (e) => emailRegix.test(e) ? false : __(`validField`) + " Email"
   },
   password: {
      type: String,
      required: true,
      isValidate: true,
      validation: (e) => e?.length < 6 ? __("passwordMustBe6Digitis") : false,
      min: 6
   }
}
const registerValidation = async (req, res, next) => {
   let postData = req.body;
   (Object.keys(userSchema))?.forEach((n) => {
      // step check reuired field exits or not 
      if ((userSchema[n]?.required && !(Object.keys(postData))?.includes(n)) || ((Object.keys(postData))?.includes(n) && userSchema[n]?.required && !(postData[n]))) {
         return res.status(404).json({ success: false, message: __(`${n} requiredField`) })
      }
      //step 2 validate field value
      if (userSchema[n]?.isValidate) {
         let checkValue = userSchema[n]?.validation(postData[n]);
         if (checkValue) {
            return res.status(404).json({ success: false, message: `${checkValue}` })
         }
      }
   })
   next();
   //first check all requrired value exits or not
}

const UserRegisterValidation = {
   registerValidation
}
module.exports = UserRegisterValidation