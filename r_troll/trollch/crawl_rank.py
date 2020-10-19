import requests
import numpy as np
import pandas as pd
import requests
import re
from bs4 import BeautifulSoup
import json
import pymysql
import pickle
import time
import numpy as np
import sys
import os
from auth import MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD

def Rank():
    
    conn = pymysql.connect(host=MYSQL_HOST, user=MYSQL_USER, 
                       password=MYSQL_PASSWORD, db='FindTroll', charset='utf8')
    curs = conn.cursor()
    sql = "REPLACE INTO `tiers` (tier_name, users_num, users_per, aggregation_num, aggregation_per) VALUES (%s,%s,%s,%s,%s)"
    initURL = 'https://kr.api.riotgames.com'

    source = requests.get("https://op.gg/statistics/tier/").text
    soup = BeautifulSoup(source, "html.parser")
    keywords = soup.select("tbody.Content > tr > td")
    keywords = [str(each_line.get_text().strip()) for each_line in keywords]
    tmp = []
    #replace("찾을값", "바꿀값", [바꿀횟수])
    for i in range(len(keywords)):
        keywords[i] = keywords[i].replace('\t', '').replace('\n', '')
        if(len(keywords[i])>0):
            tmp.append(keywords[i])
    keywords = tmp
    tmp2 = []
    cnt = 0
    tmp = []
    for i in range(0,len(keywords)):
        tmp.append(keywords[i])
        cnt+=1
        if(cnt==3):
            tmp2.append(tmp)
            tmp = []
            cnt = 0
    keywords = tmp2
    data = [[0,0,0,0,0] for i in range(len(keywords))]
    for i in range(len(keywords)):
        for j in range(3):
            #티어이름
            if(j==0):
                data[i][0] = keywords[i][0].split(' ')[0] + keywords[i][0].split(' ')[1]
                print(data[i][0])
            #해당 티어 인원수
            elif(j==1):
                data[i][1] = keywords[i][1].split('(')
                data[i][2] = data[i][1][1].split('%')[0] #상위 %
                data[i][1] = data[i][1][0] #인원수
            #누계
            else:
                data[i][3] = keywords[i][2].split('(')
                data[i][4] = data[i][3][1].split('%')[0]
                data[i][3] = data[i][3][0] #인원수
    for i in range(len(data)):
        curs.execute(sql,(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4]))   #DB insert 시 JSON 형식으로 바꿔서 넣음
        conn.commit()
Rank()