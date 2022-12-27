from bs4 import BeautifulSoup
import requests
import pymongo
from pprint import pp, pprint


db = client.BaseballTeammates
player_collection = db.Players

player_list = []

def get_list_of_debuts_bref(year):
    return BeautifulSoup(requests.get(f"https://www.baseball-reference.com/leagues/majors/{year}-debuts.shtml").text, "html.parser")

def process_player_list(player_soup):
    for row in player_soup.find("table", id="misc_bio").find("tbody").findAll("tr"):
        player_name = row.find("td", {"data-stat": "player"}).find("a").text
        player_url = row.find("td", {"data-stat": "player"}).find("a").get("href")
        player_debut = row.find("td", {"data-stat": "debut"}).get("csk")

        player_list.append({
            "_id": player_url,
            "url": player_url,
            "debut": player_debut
        })

def get_latest_insert():
    return db.Players.find_one(sort=([("$natural", -1)]))

def sort_player_list():
    player_list.sort(key=lambda item:item["debut"], reverse=False)

def remove_old_debuts(last_player_url):
    player_list.sort(key=lambda item:item["debut"], reverse=True)

    last_player_index = next((index for (index, d) in enumerate(player_list) if d["url"] == last_player_url), None)
    del player_list[last_player_index:]
    for player in player_list:
        del player["debut"]

    player_list.reverse()

def get_player_info(player_page_url):
    player_soup = BeautifulSoup(requests.get(f"https://www.baseball-reference.com{player_page_url}").text.replace("<!--","").replace("-->",""), "html.parser")

    meta_div = player_soup.find("div", id="meta")

    info_page_player_name = meta_div.find("h1").find("span").text    
    player_image_url = ""

    try:
        player_image_url = meta_div.find("img").get("src")
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

#get list of all player debuts for given year and convert them into a list of dictionaries
process_player_list(get_list_of_debuts_bref("2022"))

#get the last player inserted from mongo
last_player_inserted = get_latest_insert()

# #remove all the players from the list that already exist in the database becuase their debuts occured before the last insert
print(len(player_list))
remove_old_debuts(last_player_inserted["url"])
print(len(player_list))

# #loop through all the new players to get their teams and image urls
# #also print out names of players being added so I can check them manually if I want
for player in player_list:
    player.update(get_player_info(player["_id"]))

# #insert players into mongo
#print(f"Importing {len(player_list)} players\nLast Player in DB: {last_player_inserted}\nOldest debut added: {player_list[0]['name']}\nNewest debut added: {player_list[len(player_list)-1]['name']}")
player_collection.insert_many(player_list)