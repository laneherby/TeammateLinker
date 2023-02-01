const { MongoClient } = require('mongodb');
require('dotenv').config();
const SolveUtils = require('./solvegame-utils');

let client;
let db;
let collection;

const init = async () => {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URI}`;
    client = new MongoClient(uri);
    connection = await client.connect();
    db = connection.db("BaseballTeammates");
    collection = db.collection("Players");
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
        console.error(e)
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
        console.error(e);
    }

    return teammates;
};

const searchPlayerNames = async (playerName) => {
  let searchResults;

  try {
    searchResults = await collection.aggregate([
      {
        "$search": {
          "index": "default",
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
    console.error(e);
  }
  
  return searchResults;
};

const checkHighScore = async (playerOne, playerTwo) => {
  const highScores = db.collection("HighScores");

  return new Promise((resolve, reject) => {
    highScores.findOne({
      players:
        {
          $size: 2,
            $all: [
              playerOne, playerTwo
            ]
        }
    }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  });
};

const updateHighScore = async (scoreData) => {
  // scoreData = {
  //   players: [array of two players],
  //   seconds: time,
  //   moves: numMoves,
  //   timeLeader: nickname for timeleader,
  //   movesLeader: nickname for moves leader
  // }

  const highScores = db.collection("HighScores");

  const filter = { 
    players: {
      $size: 2,
      $all: [
        { $elemMatch: {$eq: scoreData.players[0]} },
        { $elemMatch: {$eq: scoreData.players[1]} }
      ]
    }
  };

  const { players, seconds, moves, timeLeader, movesLeader } = scoreData;

  const updateDoc = {
    $set: {
      players,
      ...(seconds && { seconds }),
      ...(moves && { moves }),
      ...(timeLeader && { timeLeader }),
      ...(movesLeader && { movesLeader }),
    }
  };

  const updateResult = await highScores.updateOne(filter, updateDoc, {upsert: true});
  return updateResult;
};

const getAllScores = async (scoreData) => {
  const highScores = db.collection("HighScores");
  return highScores.find({}).toArray();
};

//function that supplies player to serach from which starts with startPlayer
//compares all returned teammates to endPlayer _id
//if not found then recursively call with new players that we're going to get teammates for
//if players are within 10 years we won't skip any years
//need to put in functionality to get like the end/beginning ~20% of career to search for new teammates and use that all the way up until within 10 years of end player
//if more than 15 or 20 years we only grab the earliest/latest season of teammates
//Going to send whole player objects including teams and years to functions, so I can check the team year combo to see if they're teammates without having to query
//I don't think we even need id's to check for teammates because of how I hve the data set up?

const solveGame = async (searchedPlayers, endPlayer, firstTime = false) => {
  const endPlayerTeamYears = SolveUtils.getPlayerTeamYears(endPlayer);
  let teammateStatus = false;
  if(firstTime) {
    teammateStatus = SolveUtils.checkForTeammates(searchedPlayers, endPlayerTeamYears);
    if(teammateStatus) {
      return [searchedPlayers[0]._id, endPlayer._id];
    }
  }



};

module.exports = {
    init,
    getTwoRandomPlayers,
    getPlayerTeammates,
    searchPlayerNames,
    checkHighScore,
    updateHighScore,
    getAllScores,
    solveGame
}