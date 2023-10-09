const UserModal = require("../modals/userModal");

exports.fetchPreferencesController = async (req, res, next) => {
   try {
      let preferences = req?.user?.preferences ? req?.user?.preferences : "";
      return res.status(200).json({ success: true, data: { preferences } });
   } catch (err) {
      next(err);
   }
}
exports.updatePreferencesController = async (req, res, next) => {
   try {
      let { preferences } = req.body;
      if (!preferences) {
         return res.status(404).json({ success: false, message: __("preferences") })
      }
      UserModal.map((n) => (n?.id) === (req?.user?.id) ? ({ ...n, preferences: preferences }) : n)
      return res.status(200).json({ success: true, message: __("successFullyUpdated") });
   } catch (err) {
      next(err);
   }
}