const {MongoClient} = require('mongodb');
require('dotenv').config();

let client;
let collection;

const init = async () => {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}`;
    client = new MongoClient(uri);
    const connection = await client.connect();
    collection = connection.db("BaseballTeammates").collection("Players");
};

const isConnected = () => {
    return (client.topology !== undefined && client.topology.s.state === "connected");
}

const getTwoRandomPlayers = async (startYear = 1900, endYear = new Date().getFullYear()) => {
    startYear = Number(startYear);
    endYear = Number(endYear);

    const allowedTeams = [
      "ANA",
      "ARI",
      "ATL",
      "BAL",
      "BOS",
      "BSN",
      "CAL",
      "CHC",
      "CIN",
      "CLE",
      "COL",
      "CWS",
      "DET",
      "FLA",
      "HOU",
      "KCA",
      "KCR",
      "LAA",
      "LAD",
      "BRO",
      "MIA",
      "MIL",
      "MIN",
      "MLA",
      "MLN",
      "MON",
      "NYM",
      "NYY",
      "OAK",
      "PHA",
      "PHI",
      "PIT",
      "SDP",
      "SEA",
      "SEP",
      "NYG",
      "SFG",
      "STL",
      "TBD",
      "TBR",
      "TEX",
      "WSA",
      "TOR",
      "WSH",
      "WSN"
    ]

    let randomPlayers;

    try {
        //randomPlayers = await collection.aggregate([{$match:{"teams.years": {$lte:endYear,$gte:startYear}}}, {$sample:{size:2}}]).toArray();
        randomPlayers = await collection.aggregate(
          [
            {
              '$match': {
                '$and': [
                  {
                    'teams.years': {
                      '$lte': endYear, 
                      '$gte': startYear
                    }
                  }, {
                    'teams.name': {
                      '$in': allowedTeams
                    }
                  }
                ]
              }
            }, {
              '$sample': {
                'size': 2
              }
            }
          ]
        ).toArray();
    } catch(e) {
        console.log(e)
    }

    return randomPlayers;
};

const getPlayerTeammates = async (playerID) => {
    let teammates;

    try {
        teammates = await collection.aggregate([
            {
              $unwind: "$teams"
            },
            {
              $unwind: "$teams.years"
            },
            {
              $group: {
                _id: {
                  team: "$teams.name",
                  year: "$teams.years",
                  
                },
                results: {
                  $push: {
                    "name": "$name",
                    "_id": "$_id",
                    "image": "$image"
                  }
                }
              }
            },
            {
              $match: {
                "results._id": playerID
              }
            },
            {
              $sort: {
                "_id.year": 1
              }
            }
          ]).toArray();
    } catch (e) {
        console.log(e);
    }

    return teammates;
};

const searchPlayerNames = async (playerName) => {
  let searchResults;

  try {
    searchResults = await collection.aggregate([
      {
        "$search": {
          "index": "autocompletename",
          "autocomplete": {
            "query": playerName,
            "path": "searchName"       
          }
        }
      },
      {
        "$limit": 10
      }
    ]).toArray();
  } catch (e) {
    console.log(e);
  }
  
  return searchResults;
}

module.exports = {
    init,
    getTwoRandomPlayers,
    getPlayerTeammates,
    searchPlayerNames
}