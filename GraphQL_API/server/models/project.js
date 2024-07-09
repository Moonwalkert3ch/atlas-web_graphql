const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: String,
    weight: Number,
    description: String,
});

// export model and create the model collection in MongoDB
module.exports = mongoose.model('Project', projectSchema);
