import pymysql
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', password=None, db='mysql')
cur = conn.cursor()
cur.execute("USE scraping")
cur.execute("SELECT * FROM pages WHERE id=1")
print(cur.fetchone())
cur.close()
conn.close()