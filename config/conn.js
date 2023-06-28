const mongoose = require('mongoose');
// const config = require("../config/config")
mongoose.set('strictQuery', false);
mongoose.connect(
    "mongodb+srv://abizersafdari:absat765@mobyink.2bl6u24.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection is created');
}).catch((err) => {
    console.log(err);
    console.log('Connection is not created');
});
// 'mongodb+srv://nishabeatum7:TsanVVpeKxB6rL20@cluster0.cavm5zp.mongodb.net/Figma?retryWrites=true&w=majority'