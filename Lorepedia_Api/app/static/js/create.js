

/**
 * ==============================
 * CODIGO ORIGINAL SIN MODIFICAR
 * ==============================
 */




document.addEventListener("DOMContentLoaded", function() {
    const visible = document.getElementById('visible');
    if (visible) {
      visible.addEventListener('change', () => {
        const pass = document.getElementById('password');
        const confirm = document.getElementById('confirm_password');



        const type = visible.checked ? 'text' : 'password';
        if (pass) pass.type = type;
        if (confirm) confirm.type = type;
      });
    }

    const registerForm = document.querySelector('form');

    if (registerForm) {
      registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        registrarUsuario();
      });
    }

    function registrarUsuario() {
      const userName = document.getElementById("username").value.trim();
      const passWord = document.getElementById("password").value.trim();
      const confirmPass = document.getElementById("confirm_password").value.trim();

      if (!userName || !passWord || !confirmPass) { //paso para comprobar que los campos requeridos no estén vacios
        alert("Por favor, completa todos los campos.");
        return;
      }

      if (passWord !== confirmPass) { //comprobación de que si la contraseña es diferente a la confirmacion uwu
        alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users")) || []; //este es un arreglo que guardará los usuarios

      const existe = users.some(u => u.userName === userName);
      if (existe) {
        alert("Este usuario ya ha sido registrado.");
        return;
      }

      users.push({ userName: userName, password: passWord });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Usuario creado correctamente ✅");
      
      window.location.href = "/login"; 
    }

});




/**
 * ============================================
 * CODIGO PARA LAS PRUEBAS Y QUE NO SALGAN
 * 2183789 ERRORES DISTINTOS XDDD
 * ============================================
 */

// function registrarUsuario() {
//   const userName = document.getElementById("username").value.trim();
//   const passWord = document.getElementById("password").value.trim();
//   const confirmPass = document.getElementById("confirm_password").value.trim();

//   if (!userName || !passWord || !confirmPass) {
//     alert("Por favor, completa todos los campos.");
//     return;
//   }

//   if (passWord !== confirmPass) {
//     alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
//     return;
//   }
  
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   const existe = users.some(u => u.userName === userName);
//   if (existe) {
//     alert("Este usuario ya ha sido registrado.");
//     return;
//   }

//   users.push({ userName: userName, password: passWord });
//   localStorage.setItem("users", JSON.stringify(users));

//   alert("Usuario creado correctamente ✅");
//   //window.location.href = "/login"; Karma no es capaz de manejar redirecciones D:
//   // por eso esto se comenta para que no falle, ya que es unitario :D
// }


// document.addEventListener("DOMContentLoaded", function() {
//   // Conector del checkbox de visibilidad
//   const visible = document.getElementById('visible');
//   if (visible) {
//     visible.addEventListener('change', () => {
//       const pass = document.getElementById('password');
//       const confirm = document.getElementById('confirm_password');
//       const type = visible.checked ? 'text' : 'password';
//       if (pass) pass.type = type;
//       if (confirm) confirm.type = type;
//     });
//   }

//   // Conector del formulario
//   const registerForm = document.querySelector('form');
//   if (registerForm) {
//     registerForm.addEventListener('submit', function(event) {
//       event.preventDefault();
//       registrarUsuario(); // <- Llama a la función global
//     });
//   }
// });
