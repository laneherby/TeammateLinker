from bs4 import BeautifulSoup
import requests
import pymongo


db = client.BaseballTeammates
player_collection = db.Players

player_list = []

def get_list_of_players_bref(char_index):
    """
    get_list_of_players_bref gets the soup of all players whose last name starts with a certain letter indicated by char_index

    :param char_index: a letter of the alphabet that will match the last name of the players to be retrieved
    :return: soup for given page thats being requested
    """

    return BeautifulSoup(requests.get(f"https://www.baseball-reference.com/players/{char_index}/").text, "html.parser")

def process_player_list(player_soup):
    """
    process_player_list converts the soup of list of players into a list of dictionaries of only player page links and names

    :param player_soup: soup of the page for all players with last name that starts with a certain character
    :return: list of player dictionaries with basic info
    """

    for player in player_soup.find("div", id="div_players_").findAll("a"):
        player_list.append({
            "_id": player.get("href"),
            "url": player.get("href"),
            "name": player.text
        })

def get_player_info(player_page_url, name):
    player_soup = BeautifulSoup(requests.get(f"https://www.baseball-reference.com{player_page_url}").text.replace("<!--","").replace("-->",""), "html.parser")

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

    return {"image": player_image_url, "teams": player_history}

#start with k
player_last_name = "x"
process_player_list(get_list_of_players_bref(player_last_name))

for player in player_list:
    player.update(get_player_info(player["_id"], player["name"]))
    print(player)

player_collection.insert_many(player_list)

# print(f"Added {len(player_list)} players with last name starting with {player_last_name}")