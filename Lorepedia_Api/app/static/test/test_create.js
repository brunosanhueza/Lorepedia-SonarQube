

describe("Pruebas del archivo //create.js//", () => { //nombre de la agrupacion de tests


  beforeEach(() => { 
    //antes de cada (su traduccion kjhfjk) ah y esto es iterativo, se ejecuta una y otra vez
    // es decir, acaba una prueba y limpia todo para la siguiente y asi dxd



    //investigando un poco me enteré de que esa coma fea en realidad se llama: Backticks (`)



    //esta parte del codigo crea un escenario fake o mejor dicho un DOM fake, ¿por quie?
    //bueno, create.js depende totalmente del HTML y claro, este posee etiquetas
    //al no existir aqui pues va a explotar, por eso hacemos una especie de "mock" del HTML
    //respetando los componentes originales del mismo y asi no explota alavrga


    //y como está dentro del beforeEach, este DOM se va a crear una y otra vez hasta
    //que se terminen tooodas las pruebas
    document.body.innerHTML = //agarra el html vacio de Karma y lo llena con lo de abajito uwu
    `                                      
      <form>
        <input id="username">
        <input id="password">
        <input id="confirm_password">
      </form>
    `
    ; //hasta aquí el dom




    //se limpia localStorage luego de meter info adentro de los DOM o al menos en este caso es asi
    localStorage.clear(); 


    //se reemplaza la alerta por algo que existe pero que no hace nada 
    // para evitar que esto interrumpa las pruebas
    spyOn(window, 'alert'); 

    // fingimos la funcion de guardar, sin embargo no se guarda nada, 
    // para que? para no llenar el localStorage original
    spyOn(localStorage, 'setItem');
  });


  

  //limpiamo el DOM pirata despues de acabar cada prueba
  afterEach(() => {
    document.body.innerHTML = ''; // lo dejamos en 0 xd
  });


  // Test 1, comprobar si la contraseña y su confirmacion son distintas
  it("Los datos no coinciden (Funciona la comprobacion yeeyeyey)", () => {
    document.getElementById("username").value = "testUser";
    document.getElementById("password").value = "pass123";
    document.getElementById("confirm_password").value = "pass456";

    // ahora ejecutamos el function y probamos la vainaloca
    registrarUsuario(); 

    //ahora, gracias a los spyOn pregutamos si el mensaje que "tiene que haber llegado pues los datos son incorrectos"

    // corresponde al que programamos originalmente en las condiciones del "create.js".
    expect(window.alert).toHaveBeenCalledWith("Las contraseñas no coinciden. Inténtalo de nuevo.");
    //y bueno mas de lo mismo, aqui se espera que LOGICAMENTE, no se haya guardado el usuario
    //pues no cumple con las condiciones previamente programadas
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });


//Test 2- lo mismo pero al contrario
  it("Se deberia de registrar un usuario", () => {
    // datos que deberian de cumplir con las condiciones
    document.getElementById("username").value = "testUser";
    document.getElementById("password").value = "pass123";
    document.getElementById("confirm_password").value = "pass123";

    //ejecutamos una vez mas....
    registrarUsuario();

    //mas de lo mismo x2
    expect(window.alert).toHaveBeenCalledWith("Usuario creado correctamente ✅");
    expect(localStorage.setItem).toHaveBeenCalled(); //deberia de haber enviado la peticion de guardar al usuario
  });

  //ahora si estan vacios uno o varios campos requeridos
  // en este caso solo uno
  it("se deberia de mostrar un error al ingresar un valor en vacio", () => {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "pass123";
    document.getElementById("confirm_password").value = "pass123";

    registrarUsuario();

    expect(window.alert).toHaveBeenCalledWith("Por favor, completa todos los campos.");
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

});