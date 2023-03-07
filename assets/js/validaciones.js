
export const validar = (input) => {
    const tipoDeInput = (input.dataset.tipo);
    if (validadores[tipoDeInput]) {     
        validadores[tipoDeInput](input);
    }                                   
                                            
    if (input.validity.valid) {
        
        input.parentElement.querySelector(".message-error").innerHTML = "";
        input.parentElement.classList.remove("input__invalid");

    } else {
        
        input.parentElement.classList.add("input__invalid");             
        let mensajeDeError = mostrarMensajeDeError(input, tipoDeInput);
        input.parentElement.querySelector(".message-error").innerHTML = mensajeDeError;
        
    }
}

export const habilitarBotonEnviar = (inputs) => {
    const boton_submit = document.querySelector("[data-submit]");

    let esValido = true;
    let i = 0;
    while ((esValido) && (i < inputs.length)) {
        if (inputs[i].validity.valueMissing){
            esValido = false;
        }
        i++;
    }

    if (esValido) {
        boton_submit.classList.add("form__boton-enviar--enabled");
        boton_submit.disabled = false;
    } else {
        boton_submit.classList.remove("form__boton-enviar--enabled");
        boton_submit.disabled = true;
    }
}

const validadores = {
    nombre: (input) => validarNombre(input),
    email: (input) => validarEmail(input),
    asunto: (input) => validarAsunto(input),
    mensaje: (input) => validarMensaje(input)
}

const validarNombre = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El nombre tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50){
            mensaje = "El nombre tiene que tener menos de 50 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}
 
const validarEmail = (input) => {
    const regEx= /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/;
    let mensaje = "";
    if ( !regEx.test(input.value) ){
        mensaje = "El E-mail es incorrecto";    
    }
    input.setCustomValidity(mensaje);
}
    
const validarAsunto = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El asunto tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50){
            mensaje = "El asunto tiene que tener menos de 50 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}

const validarMensaje = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 10) {
        mensaje = "El mensaje tiene que tener al menos 10 caracteres."
    } else {
        if (texto.length > 300){
            mensaje = "El mensaje tiene que tener menos de 300 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}



const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooLong",
    "tooShort",
    "customError"
];

const mensajeDeErrores = {
    nombre: {
        valueMissing: "Ingrese su nombre. ",
        customError: "El nombre tiene que tener entre 3 y 50 caracteres."
    },
    email: {
        valueMissing: "Ingrese su e-mail.",
        patternMismatch: "El e-mail no es correcto.",
        typeMismatch: "",
        customError: ""
    },
    asunto: {
        valueMissing: "Ingrese su asunto. ",
        customError: "El asunto tiene que tener entre 3 y 50 caracteres.",
    },
    mensaje: {
        valueMissing: "Ingrese su asunto. ",
        customError: "El mensaje tiene que tener entre 10 y 300 caracteres.",
    }
}

function mostrarMensajeDeError(input, tipoDeInput) {
    let mensajes = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensajes += mensajeDeErrores[tipoDeInput][error];   
        }
    });
    return mensajes;

}




