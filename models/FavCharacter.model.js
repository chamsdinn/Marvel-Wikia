const { Schema, model } = require("mongoose");

const favCharacterSchema = new Schema({
    characterId: {
        type: Schema.Types.ObjectId,
        ref: "Character",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    
},

    )
const FavCharacter = model("Favcharacter", favCharacterSchema )
module.exports = FavCharacter ;