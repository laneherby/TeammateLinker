import pymongo

client = pymongo.MongoClient("mongodb+srv://dbAdmin:dbAdmin@baseballteammates.zfkep.mongodb.net/BaseballTeammates?retryWrites=true&w=majority")
db = client.BaseballTeammates
test_collection = db.UpdateTest
player_collection = db.Players

player_collection.update_many(
    {},
    [
        {
            "$set": {
                "searchName": {
                    "$reduce": {
                        "input": [
                            ["é", "e"],
                            ["à", "a"],
                            ["á", "a"],
                            ["í", "i"],
                            ["ó", "o"],
                            ["ú", "u"],
                            ["ñ", "n"],
                            ["É", "e"],
                            ["À", "a"],
                            ["Á", "a"],
                            ["Í", "i"],
                            ["Ó", "o"],
                            ["Ú", "u"],
                            ["Ñ", "n"],
                        ],
                        "initialValue": {
                            "$toLower": "$name"
                        },
                        "in": {
                            "$replaceAll": {
                                "input": "$$value",
                                "find": {
                                    "$arrayElemAt": [
                                        "$$this",
                                        0
                                    ]
                                },
                                "replacement": {
                                    "$arrayElemAt": [
                                        "$$this",
                                        1
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    ]
)