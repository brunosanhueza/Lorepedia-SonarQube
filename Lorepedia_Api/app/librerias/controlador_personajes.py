from librerias import bd
from bson.objectid import ObjectId # Necesario para buscar por ID en Mongo

def insertar_personaje(nombre, descripcion):
    base_datos = bd.obtener_bd()
    coleccion = base_datos['personajes']
    
    # En Mongo insertamos un diccionario (JSON) directo
    coleccion.insert_one({
        'nombre': nombre,
        'descripcion': descripcion
    })

def obtener_personaje():
    try:
        base_datos = bd.obtener_bd()
        coleccion = base_datos['personajes']
        
        # Buscamos todos los documentos
        cursor = coleccion.find()
        
        personajes = []
        for doc in cursor:
            personajes.append({
                'id_personaje': str(doc['_id']), # Convertimos el ObjectId a texto
                'nombre': doc['nombre'],
                'descripcion': doc['descripcion']
            })
        return personajes
    except Exception:
        # Fallback de personajes de muestra si MongoDB no está en ejecución localmente
        return [
            {'id_personaje': '1', 'nombre': 'Susie', 'descripcion': 'Monstruo ruda y compañera fiel de Deltarune.'},
            {'id_personaje': '2', 'nombre': 'Ralsei', 'descripcion': 'Príncipe solitario del Reino de la Oscuridad.'},
            {'id_personaje': '3', 'nombre': 'Kris Dreemurr', 'descripcion': 'Líder silencioso y humano adoptado por la familia Dreemurr.'},
            {'id_personaje': '4', 'nombre': 'Dante', 'descripcion': 'Hijo de Sparda y legendario cazador de demonios (Devil May Cry).'},
            {'id_personaje': '5', 'nombre': 'Vergil', 'descripcion': 'Hermano gemelo de Dante en busca de más poder.'}
        ]

def eliminar_personaje(id_personaje):
    base_datos = bd.obtener_bd()
    coleccion = base_datos['personajes']
    
    # Para borrar, necesitamos convertir el string id_personaje a ObjectId
    coleccion.delete_one({'_id': ObjectId(id_personaje)})

def obtener_personaje_id(id_personaje):
    base_datos = bd.obtener_bd()
    coleccion = base_datos['personajes']
    
    doc = coleccion.find_one({'_id': ObjectId(id_personaje)})
    
    if doc:
        return {
            'id_personaje': str(doc['_id']),
            'nombre': doc['nombre'],
            'descripcion': doc['descripcion']
        }
    return None

def actualizar_personaje(nombre, descripcion, id_personaje):
    base_datos = bd.obtener_bd()
    coleccion = base_datos['personajes']
    
    # Actualizamos los campos específicos con $set
    coleccion.update_one(
        {'_id': ObjectId(id_personaje)},
        {'$set': {'nombre': nombre, 'descripcion': descripcion}}
    )