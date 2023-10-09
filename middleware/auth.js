const { decode } = require("../helpers/hashFunction");
const UserModal = require("../modals/userModal");
exports.protected = async (req, res, next) => {
   try {
      var token;
      if (req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer')) {
         token = req?.headers?.authorization.split(' ')[1];
      }
      if (!token) {
         return res.status(401).json({ success: false, message: __("tokenRequired") });
      }
      var tokenDecode = await decode(token);
      tokenDecode = JSON.parse(tokenDecode)
      const userExits = UserModal?.find((n) => String(n?.id) === String(tokenDecode?.id));
      if (!userExits) {
         return res.status(401).json({ success: false, message: __("unAuthorizedAccess"), data:{UserModal, tokenDecode} });
      }
      req.user = userExits
      next()
   } catch (err) {
      next(err)
   }
}