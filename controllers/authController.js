const { __ } = require("i18n");
const UserModal = require("../modals/userModal");
const { v4: uuidv4 } = require('uuid');
const { encode, decode } = require("../helpers/hashFunction");
const { initPreferences } = require("../helpers/constents");
exports.registerAPI = async (req, res, next) => {
   try {
      let { fullName, email, password } = req.body;
      if (UserModal?.find(({ email: emailCheck }) => (emailCheck?.trim()) === (email?.trim()))) {
         return res.status(404).json({ success: false, message: __("userAlreadyEmailExits") })
      }
      password = await encode(password);
      UserModal.push({
         id: uuidv4(),
         fullName: fullName?.trim(),
         email: email?.trim(),
         password: password,
         createdAt: new Date(),
         updatedAt: new Date()
      });
      return res.status(200).json({ success: true, message: __("successfullyRegister") })
   } catch (err) {
      next(err)
   }
}


exports.loginApi = async (req, res, next) => {
   try {
      let { email, password } = req.body;
      if (!email) {
         return res.status(404).json({ success: false, message: __("emailRequired") })
      }
      if (!password || password < 6) {
         return res.status(404).json({ success: false, message: __("passwordMustBe6Digitis") })
      }
      password = await encode(password);
      const userExits = UserModal?.find(({ email: emailCheck, password: passwordCheck }) => emailCheck === email?.trim() && passwordCheck === password);
      if (!userExits) {
         return res.status(404).json({ success: false, message: __("userNotExits") })
      }
      let jwtToken = await encode(JSON.stringify(userExits));
      return res.status(200).json({
         success: true, data: {
            jwtToken: jwtToken, user: {
               id: userExits?.id,
               fullName: userExits?.fullName,
               email: userExits?.email,
               preferences: initPreferences,
               createdAt: userExits?.createdAt,
               updatedAt: userExits?.updatedAt
            }
         }
      });
   } catch (err) {
      next(err)
   }
}