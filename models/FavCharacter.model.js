const { Schema, model } = require("mongoose");

const favCharacterSchema = new Schema({
    character: {
        type: Schema.Types.ObjectId,
        ref: "Character",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    
},

    )
const FavCharacter = model("Favcharacter", favCharacterSchema )
module.exports = FavCharacter ;