from flask import Flask, render_template, redirect, request
from livereload import Server as sv

from librerias import controlador_personajes as cp#anular chiste del CP dios tenemos más de 20 años


app=Flask(__name__)


@app.route('/login')#endpoint login
def login():
    return render_template('lorepedia/iniciarSesion.html')


@app.route('/registrar')#endpoint para registrar, post porque estamos enviando información
def registrar():
    return render_template('lorepedia/crearSesion.html')



#==================
#ZONA ENDPOINT HOME
#==================
@app.route('/') #endpoint home
def index():
    return render_template('lorepedia/index.html')












#==================
#ZONA ENDPOINT CRUD
#==================
@app.route('/personajes') #endpoint personajes
def personajes():
    lista_personajes = cp.obtener_personaje()
    return render_template('lorepedia/Paginas/Personajes.html', personajes=lista_personajes) #con esto hacemo trabajar al jinja












@app.route('/agregarPersonaje')
def agregarPersonaje():
    return render_template('lorepedia/agregarPersonaje.html')






@app.route('/guardarPersonaje', methods=['POST'])
def guardarPersonaje():
    #se obtiene del formulario y desde el id "nombre" y "descripcion" del html logicamente
    nombre = request.form["nombre"]
    descripcion = request.form["descripcion"]
    cp.insertar_personaje(nombre, descripcion)
    return redirect('/personajes') #volvemos a la pagina de personajes
    









@app.route('/eliminarPersonaje', methods=['POST'])
def eliminarPersonaje():
    id_personaje = request.form['id_personaje']
    cp.eliminar_personaje(id_personaje)
    return redirect('/personajes')



if __name__=='__main__':
    # Configura Livereload para Flask
    server = sv(app.wsgi_app)
    server.watch('**/*.html')
    server.watch('**/*.css')
    server.watch('**/*.js')
    server.serve(port=5000, debug=True)