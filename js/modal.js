const openModalButton = document.querySelector("#open-modal");
// Retorna o primeiro elemento dentro do documento
const closeModalButton = document.querySelector("#close-modal");
//fechar modal quando salvar
const salvarModalButton = document.querySelector("#submit-modal");
const enviarModalButton = document.getElementById("enviar-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
    
//função abrir ou fechar modal
//add ou remover a classList
const toggleModal = () => {
    //class add
    modal.classList.toggle("hide");
    //class removida
    fade.classList.toggle("hide");
};

// o forEach esta passando o nome de todos os atributos dentro do colchetes para el - elemento no caso
//e abre uma função pegando todos os atributos dentro desse elemento
[openModalButton, closeModalButton, salvarModalButton, fade].forEach((el) => {
//esta chamando a função criada acima p ser executada
    el.addEventListener("click", () => toggleModal())
});
