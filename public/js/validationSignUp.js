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
    let textDangerLastName = document.querySelector('#text-danger-last-name')
    let textDangerDni = document.querySelector('#text-danger-dni')
    let textDangerUser = document.querySelector('#text-danger-user')
    let textDangerMail = document.querySelector('#text-danger-mail')
    let textDangerPassword = document.querySelector('#text-danger-password')
    let textDangerAdress = document.querySelector('#text-danger-adress')
    let textDangerNumber = document.querySelector('#text-danger-number')
    let textDangerCp = document.querySelector('#text-danger-cp')

    name.addEventListener('focus', function () {
        textDangerName.innerHTML = '*Tu nombre debe tener al menos 2 caracteres';
    })
    name.addEventListener('change', function () {
        textDangerName.style.display = 'none';
    })

    name.addEventListener('blur', function () {
        if (!name.value.length) {
            textDangerName.style.display = 'unset';
            textDangerName.innerHTML = '*Este campo debe estar completo';
        };
    })

    apellido.addEventListener('focus', function () {
        textDangerLastName.innerHTML = '*El apellido debe tener al menos 2 caracteres';
    })
    apellido.addEventListener('change', function () {
        textDangerLastName.style.display = 'none';
    })

    apellido.addEventListener('blur', function () {
        if (!apellido.value.length) {
            textDangerLastName.style.display = 'unset';
            textDangerLastName.innerHTML = '*Este campo debe estar completo';
        };
    })

    dni.addEventListener('focus', function () {
        textDangerDni.innerHTML = '*Este campo debe estar completo';
    })
    dni.addEventListener('change', function () {
        textDangerDni.style.display = 'none';
    })

    dni.addEventListener('blur', function () {
        if (dni.value == 0) {
            textDangerDni.style.display = 'unset';
            textDangerDni.innerHTML = '*Este campo debe estar completo';
        };
    })

    
    user.addEventListener('focus', function () {
        textDangerUser.innerHTML = '*Este campo debe estar completo';
    })
    user.addEventListener('change', function () {
        textDangerUser.style.display = 'none';
    })

    user.addEventListener('blur', function () {
        if (!user.value.length) {
            textDangerUser.style.display = 'unset';
            textDangerUser.innerHTML = '*Este campo debe estar completo';
        };
    })

    email.addEventListener('focus', function () {
        textDangerMail.innerHTML = '*Tu mail debe ser válido';
    })
    email.addEventListener('change', function () {
        textDangerMail.style.display = 'none';
    })

    email.addEventListener('blur', function () {
        if (!email.value.length) {
            textDangerMail.style.display = 'unset';
            textDangerMail.innerHTML = '*Este campo debe estar completo';
        };
    })

    password.addEventListener('focus', function () {
        textDangerPassword.innerHTML = '*Tu contraseña debe tener al menos 8 caracteres';
    })
    password.addEventListener('change', function () {
        textDangerPassword.style.display = 'none';
    })

    password.addEventListener('blur', function () {
        if (!password.value.length) {
            textDangerPassword.style.display = 'unset';
            textDangerPassword.innerHTML = '*Este campo debe estar completo';
        };
    })

    direccion.addEventListener('focus', function () {
        textDangerAdress.innerHTML = '*Este campo debe estar completo';
    })
    direccion.addEventListener('change', function () {
        textDangerAdress.style.display = 'none';
    })

    direccion.addEventListener('blur', function () {
        if (!direccion.value.length) {
            textDangerAdress.style.display = 'unset';
            textDangerAdress.innerHTML = '*Este campo debe estar completo';
        };
    })

    numero.addEventListener('focus', function () {
        textDangerNumber.innerHTML = '*Este campo debe estar completo';
    })
    numero.addEventListener('change', function () {
        textDangerNumber.style.display = 'none';
    })

    numero.addEventListener('blur', function () {
        if (numero.value == 0) {
            textDangerNumber.style.display = 'unset';
            textDangerNumber.innerHTML = '*Este campo debe estar completo';
        };
    })

    cp.addEventListener('focus', function () {
        textDangerCp.innerHTML = '*Este campo debe estar completo';
    })
    cp.addEventListener('change', function () {
        textDangerCp.style.display = 'none';
    })

    cp.addEventListener('blur', function () {
        if (name.value == 0) {
            textDangerCp.style.display = 'unset';
            textDangerCp.innerHTML = '*Este campo debe estar completo';
        };
    })

    form.addEventListener("submit", function (e) {


        let errores = [];

        if (name.value.length < 2) {
            errores.push('*Tu nombre debe tener al menos 2 caractéres');
        }
        
        if (apellido.value.length < 2) {
            errores.push('*Tu Apellido debe tener al menos 2 caractéres');
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
            errores.push('Tu contraseña debe ser mayor a 8 digitos');
        }
        if (repassword.value.length < 8) {
            errores.push('La segunda contraseña también debe ser mayor a 8 digitos');
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
