import mongoose from 'mongoose'
import User from './userModel.js'

const movieListSchema = new mongoose.Schema({
    movieListName: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

    movieItem : [{
        type: String
    }]
})

const movieList = mongoose.model('movieList', movieListSchema)

export default movieList