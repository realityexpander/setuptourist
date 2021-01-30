const typeorm = require('typeorm');

class Creator {
  constructor(id, ytChannelName, ytImgUrl, ytChannelUrl, ytChannelUrlName) {
    this.id = id
    this.ytChannelName = ytChannelName
    this.ytImgUrl = ytImgUrl
    this.ytChannelUrl = ytChannelUrl
    this.ytChannelUrlName = ytChannelUrlName
  }
}

const EntitySchema = require('typeorm').EntitySchema;

const CreatorSchema = new EntitySchema({
  name: "Creator",
  target: Creator,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    ytChannelName: {    // full name of channel
      type: "varchar"
    },
    ytImgUrl: {         // full URL of the channel avatar
      type: "text"
    },
    ytChannelUrl: {     // full URL of the channel
      type: "text"
    },
    ytChannelUrlName: { // ONLY the name from the channel URL
      type: "text"
    }
  }
})

async function getConnection() {
  return await typeorm.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "setuptourist",
    insecureAuth: true,
    synchronize: true,
    logging: false,
    entities: [
      CreatorSchema
    ]
  })
}

async function getAllCreators() {
  const connection = await getConnection()
  const creatorRepo = connection.getRepository(Creator)
  const creators = await creatorRepo.find()
  connection.close()

  return creators
}

async function insertCreator(ytChannelName, ytImgUrl, ytChannelUrl, ytChannelUrlName) {
  const connection = await getConnection()

  // create
  const creator = new Creator()
  creator.ytChannelName    = ytChannelName
  creator.ytImgUrl         = ytImgUrl
  creator.ytChannelUrl     = ytChannelUrl
  creator.ytChannelUrlName = ytChannelUrlName

  const creatorRepo = connection.getRepository(Creator)
  const res = await creatorRepo.save(creator)
  // console.log('saved to db:', res)

  // get new list
  const allCreators = await creatorRepo.find()
  connection.close()

  return allCreators
}

module.exports = {
  getAllCreators,
  insertCreator
}