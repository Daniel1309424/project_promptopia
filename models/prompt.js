import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,  // Corrected from mongoose.Schema.Types.ObjectId
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],  // Fixed typo ("Promp" to "Prompt")
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);  // Make sure the model name is capitalized

export default Prompt;
