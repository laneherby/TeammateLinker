import sys
from bs4 import BeautifulSoup
import requests


start_player = sys.argv[1]
end_player = sys.argv[2]

oracle_soup = BeautifulSoup(requests.get(f"https://www.baseball-reference.com/oracle/link.cgi?n1={start_player}&n2={end_player}").text, "html.parser")

try:
    for player in oracle_soup.find("form", id="oracle_link").findAll("strong"):
        print(player.text)
except:
    print("NO ANSWERS")

sys.stdout.flush()