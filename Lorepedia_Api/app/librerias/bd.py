# importacion de librerias para soportar MongoDB Community Edition (en este caso xd).

from pymongo import MongoClient

def obtener_bd():
    # Timeout de 2000 ms para evitar que la aplicación se congele si la base de datos está offline
    client = MongoClient('localhost', 27017, serverSelectionTimeoutMS=2000)
    bd = client['personajes_db']
    return bd