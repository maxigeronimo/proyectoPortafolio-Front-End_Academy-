import { validar, habilitarBotonEnviar } from "./validaciones.js";

const inputs = document.querySelectorAll(".input");
const enviar = document.querySelector("[data-submit]");

inputs.forEach((input) => {

    input.addEventListener("blur", (input) => {
        validar(input.target)
    });

    input.addEventListener("keyup", (input) => {
        validar(input.target);
        habilitarBotonEnviar(inputs);
    });
});

enviar.addEventListener("click", () => {
});