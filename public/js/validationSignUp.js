import validator from 'validator';

window.addEventListener('load', function(){
    let form = document.querySelector('#form')

    let name = document.querySelector('#name')
    let apellido = document.querySelector('#apellido')
    let dni = document.querySelector('#dni')
    let avatar = document.querySelector('#avatar')
    let user = document.querySelector('#user')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let repassword = document.querySelector('#repassword')
    let direccion = document.querySelector('#direccion')
    let numero = document.querySelector('#numero')
    let cp = document.querySelector('#cp')
    let button = document.querySelector('#button')
    let repasswordError = document.querySelector('#repasswordError')
    let textDangerName = document.querySelector('#text-danger-name')

name.addEventListener('focus', function(){
        textDangerName.innerHTML = 'El nombre debe tener al menos 2 caracteres';
    })
name.addEventListener('change', function(){
    textDangerName.style.display = 'none';
})

name.addEventListener('blur', function(){
    if (name.value.length < 2){
        alert('Este campo debe estar completo');
    };
})

form.addEventListener("submit", function(e){

    let errores = [];

    if (name.value.length < 2){
        errores.push = 'Este campo debe estar completo';
    }
        if (email.value.length < 2 ){
        errores.push = 'Este campo debe estar completo';
    }
        if (password.value.length < 8 ){
        errores.push = 'Este campo debe estar completo';
    }
        if (repassword.value.length < 8 ){
        errores.push = 'Este campo debe estar completo';
    }

    if(errores.length > 0){
        e.preventDefault();

        //let error = document.querySelector("error")

        //for (let index = 0; index < errores.length; index++) {
            

            
        //}
    }

    })

})


