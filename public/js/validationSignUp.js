window.addEventListener('load', function () {
    let form = document.querySelector('#form')

    let name = document.querySelector('#name')
    let apellido = document.querySelector('#apellido')
    let dni = document.querySelector('#dni')
    let avatar = document.getElementById('avatar')
    let user = document.querySelector('#user')
    let email = document.querySelector('#email')
    let password = document.querySelector('#password')
    let repassword = document.querySelector('#repassword')
    let direccion = document.querySelector('#direccion')
    let numero = document.querySelector('#numero')
    let cp = document.querySelector('#cp')
    let button = document.querySelector('#button')
    let textDangerName = document.querySelector('#text-danger-name')

    name.addEventListener('focus', function () {
        textDangerName.innerHTML = '*El nombre debe tener al menos 2 caracteres';
    })
    name.addEventListener('change', function () {
        textDangerName.style.display = 'none';
    })

    name.addEventListener('blur', function () {
        if (!name.value.length) {
            textDangerName.innerHTML = '*Este campo debe estar completo';
        };
    })

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("lindo boton")

        let errores = [];

        if (name.value.length < 2) {
            errores.push('Tu nombre es muy corto');
        }
        
        if (apellido.value.length < 2) {
            errores.push('Tu Apellido es muy corto');
        }

        
        if (email.value.length < 2) {
            errores.push('Tu mail es muy corto');
        } else {
            if (!ValidateEmail(email.value)) {
                errores.push('El mail debe ser válido')
            }
        }

        if (!ValidateExtension(avatar.value)) {
            errores.push('El archivo a adjuntar no es una imagen');
        }


        if (password.value.length < 8) {
            console.log("contraseña colta")
            errores.push('Tu contraseña debe ser mayor a 8 digitos');
        }
        if (repassword.value.length < 8) {
            errores.push('La segunda contraseña tambien debe ser mayor a 8 digitos');
        }

        console.log(errores)

        if (errores.length > 0) {
            e.preventDefault();

            let errorList = document.querySelector("#errorList")
            errorList.innerHTML = ""


            errores.forEach(error => {
                errorList.innerHTML += `<li>${error}<li/>`
            })

            //for (let index = 0; index < errores.length; index++) {



            //}
        } else {
            /*swal({
                title: '¡Usuario creado!',
                text: user.value + ", tu usuario fue creado",
                type: 'success'
            })*/

        };

    }

    )


})

function ValidateEmail(input) {
    if (input.includes('@')) {
        if (input.slice(-4) == ".com")
            return true
    }
    return false;
}

function ValidateExtension(input) {
    let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.PNG'];
        if ( acceptedExtensions.includes(input.slice(-4)) )
            return true
    return false;
}
