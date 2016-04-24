import pymysql
conn = pymysql.connect(host='127.0.0.1', unix_socket='/run/mysqld/mysqld.sock',user='root', passwd=None, db='scraping')
###conn = pymysql.connect(host='127.0.0.1', unix_socket='/tmp/mysql.sock',  ### invalid sock location, you can omit this parameter or refer to doc.
###                    user='root', passwd=None, db='mysql')                ### invalid db name, before selecting db, you need to check your databases
cur = conn.cursor()
###cur.execute("USE scraping")                                              ### no need to specify db name twice
cur.execute("SELECT * FROM pages WHERE id=1")
print(cur.fetchone())
cur.close()
conn.close()
