from urllib.request import urlopen
from urllib.error import HTTPError, URLError
from bs4 import BeautifulSoup

try:
    html = urlopen('http://pythonscraping.com/pages/page1.html')
except HTTPError as e:
    print(e)
    # return null, break, あるいは他の処理を実行
#print(html.read())
except URLError as e:
    print("The server could not be found!")
else:
    # プログラムは継続．
    # ※例外の捕捉でreturnかbreakしたらelse文は実行されないため，いらない．
    print("It worked!")
#bs = BeautifulSoup(html.read(), 'html.parser')
#print(bs.h1) # 上から最初のh1タグを取ってくる．複数h1タグがある場合は，最初のものしか取られないことに注意．