import requests
import numpy as np
from bs4 import BeautifulSoup

def Trim(summonerName):
    summonerName = summonerName
    source = requests.get("https://www.op.gg/summoner/userName=" + summonerName).text
    soup = BeautifulSoup(source, "html.parser")
    keywords = soup.select("div.MostChampionContent")

    keywords = [str(each_line.get_text().strip()) for each_line in keywords]
    keywords = keywords[1].split('\n')

    tmp = []
    #replace("찾을값", "바꿀값", [바꿀횟수])
    for i in range(len(keywords)):
        keywords[i] = keywords[i].replace('\t', '').replace('\n', '')
        if(len(keywords[i])>0):
            tmp.append(keywords[i])
    keywords = tmp
    tmp = []
    tmp2 = []
    cnt = 0
    for i in range(len(keywords)):
        tmp.append(keywords[i])
        cnt+=1
        if(cnt%11==0 and i!=0): 
            tmp2.append(tmp)
            tmp = []
            cnt = 0
    keywords = tmp2

    winRate = []
    for i in range(len(keywords)):
        tmp = []
        tmp.append(keywords[i][0]) #op.gg champ명
        tmp.append(keywords[i][9]) #해당 챔피언 승률
        tmp.append(keywords[i][10]) #해당 챔피언 플레이 판 수
        winRate.append(tmp)
    return winRate
    
winRate = Trim("페닛칠")
for i in range(len(winRate)):
    print(winRate[i])

