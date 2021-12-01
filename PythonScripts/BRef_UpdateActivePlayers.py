from bs4 import BeautifulSoup
import requests
import pymongo
import sys
from datetime import datetime

# RUN SCRIPT WITH ONE ARGUMENT A LETTER FROM TEH ALPHABET MATCHING THE FIRST LETTER OF LAST NAMES


db = client.BaseballTeammates
player_collection = db.Players

active_player_list = []

def get_list_of_players_bref(char_index):
    """
    get_list_of_players_bref gets the soup of all players whose last name starts with a certain letter indicated by char_index

    :param char_index: a letter of the alphabet that will match the last name of the players to be retrieved
    :return: soup for given page thats being requested
    """

    return BeautifulSoup(requests.get(f"https://www.baseball-reference.com/players/{char_index}/").text, "html.parser")

def process_player_list(player_soup):
    #the findAll("b") gets only the active players which I'm looking for
    for player in player_soup.find("div", id="div_players_").findAll("b"):
        playerLink = player.find("a")
        active_player_list.append({
            "_id": playerLink.get("href"),
            "url": playerLink.get("href"),
            "name": playerLink.text
        })

def get_player_info(player_page_url):
    player_soup = BeautifulSoup(requests.get(f"https://www.baseball-reference.com{player_page_url}").text.replace("<!--","").replace("-->",""), "html.parser")

    info_page_player_name = player_soup.find("h1", {"itemprop": "name"}).find("span").text

    player_image_url = ""

    try:
        player_image_url = player_soup.find("div", id="meta").find("img").get("src")
    except:
        player_image_url = "None"

    player_history = []

    try:
        for row in player_soup.find("table", id="appearances").find("tbody").findAll("tr"):
            team_name = row.find("td", {"data-stat": "team_ID"}).find("a").text
            team_index = next((index for (index, d) in enumerate(player_history) if d["name"] == team_name), -1)
            if team_index > -1:
                player_history[team_index]["years"].append(int(row.find("th", {"data-stat": "year_ID"}).text))
            else:    
                player_history.append({"name":team_name, "years": [int(row.find("th", {"data-stat": "year_ID"}).text)]})
    except:
        player_history = "None"

    return {"name": info_page_player_name, "image": player_image_url, "teams": player_history}


#I ALREADY DID K NOT THAT IT MATTERS?
process_player_list(get_list_of_players_bref(str(sys.argv[1])))

today_date_time = datetime.now().strftime("%m/%d/%Y %H:%M:%S")


# goes through each player in the active list from Baseball Reference
players_to_delete_indexes = []
for player in active_player_list:
    curr_player = get_player_info(player["_id"])
    # loops through all the values in the team history for the current player to see if they played in 2021 or current year because I'm only updating current players
    lol_years = [sub["years"] for sub in curr_player["teams"]]
    curr_player_years = [year for sublist in lol_years for year in sublist]

    
    if 2021 in curr_player_years:    
    # if they are active then we update them in the list with their teams
        player.update(curr_player)
    # else we delete them from the active list so we don't have to update them in mongo
    else:
        players_to_delete_indexes.append(next((index for (index, d) in enumerate(active_player_list) if d["url"] == player["_id"]), None))

players_to_delete_indexes.sort(reverse=True)
for delete_index in players_to_delete_indexes:
    del active_player_list[delete_index]

players_from_mongo = []

#getting all the active players from mongo to put in an array
for doc in player_collection.find({"_id": {"$in" : [d["_id"] for d in active_player_list]}}):
    players_from_mongo.append(doc)

#looping through each player from mongo and finding the matching player from the bref array
#creating a object and adding key value pairs if they have different than what is stored in mongo
#if the object is not empty finish creating the query objects and update the current player in mongo to match bref
with open('UpdatingActivePlayers.log', 'a') as log_file:
    for player_mongo in players_from_mongo:
        player_bref = next((p for p in active_player_list if p["_id"] == player_mongo["_id"]), None)
        query = {}
        if player_bref["teams"] != player_mongo["teams"]:
            query["teams"] = player_bref["teams"]
        if player_bref["name"] != player_mongo["name"]:
            query["name"] = player_bref["name"]
        if player_bref["image"][player_bref["image"].find("images")+6:] != player_mongo["image"][player_mongo["image"].find("images")+6:]:
            query["image"] = player_bref["image"]

        if query != {}:
            filter_query = {"_id": player_mongo["_id"]}
            set_query = {"$set": query}
            player_collection.update_one(filter_query, set_query)
            print(player_mongo["name"] + " is being updated with changes.\n" + str(query))
            log_file.write(player_mongo["name"] + " is being updated with changes on " + today_date_time + "\n" + str(query) + "\n")
            