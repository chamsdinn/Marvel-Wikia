const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const characterSchema = new Schema(
  {
    // id: Number,
    name: String,
    description: String,
    //modified: String,
    //resourceURI: String,
    // urls: [
    //   {
    //     type: String,
    //     url: String,
    //   },
    // ],
    thumbnail: {
      path: String,
      extension: String
    },
    comics: {
      available: Number,
      returned: Number,
      collectionURI: String,
      items: [
        {
          resourceURI: String,
          name: String
        }
      ]
    }
    // stories: {
    //   available: Number,
    //   returned: Number,
    //   collectionURI: String,
    //   items: [
    //     {
    //       resourceURI: String,
    //       name: String,
    //       type: String,
    //     },
    //   ],
    // },
    // events: {
    //   available: Number,
    //   returned: Number,
    //   collectionURI: String,
    //   items: [
    //     {
    //       resourceURI: String,
    //       name: String,
    //     },
    //   ],
    // },
    // series: {
    //   available: Number,
    //   returned: Number,
    //   collectionURI: String,
    //   items: [
    //     {
    //       resourceURI: String,
    //       name: String,
    //     },
    //   ],
    // },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true
  }
);

const Character = model("Character", characterSchema);

module.exports = Character;