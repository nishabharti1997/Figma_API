// exports.ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     // res.send('welcome to profile');
// }
// exports.ensureGuest = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         return next();
//     } else {
//         res.redirect('/log');
//     }
// }