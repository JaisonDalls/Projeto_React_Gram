const mongoose = require('mongoose');
const {Schema} = mongoose;

const photoSchema = new Schema(
    {
        imagePath: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        likes: Array,
        comments: Array,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userName: String
    },
    {
        timestamps: true
    }
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;