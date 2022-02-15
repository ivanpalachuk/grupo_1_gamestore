window.addEventListener('load', function () {
    let form = document.querySelector('#form')
    let titulo = document.querySelector('#titulo')
    let precio = document.querySelector('#precio')
    let descuento = document.querySelector('#descuento')
    let resumen = document.querySelector('#resumen')
    let legal = document.querySelector('#legal')
    let tecnicos = document.querySelector('#datosTecnicos')
    let requisitos = document.querySelector('#requisitos')
    let textDangerTitulo = document.querySelector('#text-danger-titulo')
    let textDangerPrecio = document.querySelector('#text-danger-precio')
    let textDangerResumen = document.querySelector('#text-danger-resumen')
    let textDangerLegal = document.querySelector('#text-danger-legal')
    let textDangerTecnicos = document.querySelector('#text-danger-tecnicos')
    let textDangerRequisitos = document.querySelector('#text-danger-requisitos')

    
    titulo.addEventListener('focus', function () {
        textDangerTitulo.innerHTML = '*El titulo debe tener al menos 2 caracteres';
    })
    titulo.addEventListener('change', function () {
        textDangerTitulo.style.display = 'none';
    })

    titulo.addEventListener('blur', function () {
        if (titulo.value.length<2) {
            textDangerTitulo.style.display = 'unset';
            textDangerTitulo.innerHTML = '*El titulo debe tener al menos 2 caracteres';
        };
    })
    
    precio.addEventListener('focus', function () {
        textDangerPrecio.innerHTML = '*Este campo debe estar completo';
    })
    precio.addEventListener('change', function () {
        textDangerPrecio.style.display = 'none';
    })

    precio.addEventListener('blur', function () {
        if (precio.value == 0) {
            textDangerPrecio.style.display = 'unset';
            textDangerPrecio.innerHTML = '*Este campo debe estar completo';
        };
    })

    resumen.addEventListener('focus', function () {
        textDangerResumen.innerHTML = '*Este campo debe tener al menos 20 caracteres';
    })
    resumen.addEventListener('change', function () {
        textDangerResumen.style.display = 'none';
    })

    resumen.addEventListener('blur', function () {
        if (resumen.value.length < 20) {
            textDangerResumen.style.display = 'unset';
            textDangerResumen.innerHTML = '*Este campo debe tener al menos 20 caracteres';
        };
    })

    legal.addEventListener('focus', function () {
        textDangerLegal.innerHTML = '*Este campo debe estar completo';
    })
    legal.addEventListener('change', function () {
        textDangerLegal.style.display = 'none';
    })

    legal.addEventListener('blur', function () {
        if (!legal.value.length) {
            textDangerLegal.style.display = 'unset';
            textDangerLegal.innerHTML = '*Este campo debe estar completo';
        };
    })

    tecnicos.addEventListener('focus', function () {
        textDangerTecnicos.innerHTML = '*Este campo debe estar completo';
    })
    tecnicos.addEventListener('change', function () {
        textDangerTecnicos.style.display = 'none';
    })

    tecnicos.addEventListener('blur', function () {
        if (!tecnicos.value.length) {
            textDangerTecnicos.style.display = 'unset';
            textDangerTecnicos.innerHTML = '*Este campo debe estar completo';
        };
    })

    requisitos.addEventListener('focus', function () {
        textDangerRequisitos.innerHTML = '*Este campo debe estar completo';
    })
    requisitos.addEventListener('change', function () {
        textDangerRequisitos.style.display = 'none';
    })

    requisitos.addEventListener('blur', function () {
        if (!requisitos.value.length) {
            textDangerRequisitos.style.display = 'unset';
            textDangerRequisitos.innerHTML = '*Este campo debe estar completo';
        };
    })


    form.addEventListener("submit", function (e) {


        let errores = [];

        if (titulo.value.length < 2) {
            errores.push('*El titulo debe tener al menos 2 caracteres');
        }
        
        if (resumen.value.length < 20) {
            errores.push('*El resumen debe tener al menos 20 caracteres');
        }

        if (errores.length > 0) {
            e.preventDefault();

            let errorList = document.querySelector("#errorList")
            errorList.innerHTML = ""


            errores.forEach(error => {
                errorList.innerHTML += `<li>${error}<li/>`
            })
        }
    })
})