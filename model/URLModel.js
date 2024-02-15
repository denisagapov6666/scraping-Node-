import mongoose, {Schema} from "mongoose";

const URLSchema = new Schema({
    url: {
        type: String,
        required: true
    }
})

export default mongoose.model('URL', URLSchema);