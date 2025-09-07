import os
from mysql.connector import pooling

dbconfig = {
    'host': os.getenv('HOST'),
    'user': os.getenv('USER'),
    'password': os.getenv('PASSWORD'),
    'database': os.getenv('DATABASE')
}

db = pooling.MySQLConnectionPool(pool_name='mypool', pool_size=5, **dbconfig)