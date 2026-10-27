# importacion de librerias para soportar MongoDB Community Edition (en este caso xd).

from pymongo import MongoClient

def obtener_bd():
    client = MongoClient('localhost',27017)

    bd = client['personajes_db']
    return bd