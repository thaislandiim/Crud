const banco_chave = 'info'

//obtem dados do banco
const getBanco = () => {
    const banco_ls = localStorage.getItem(banco_chave)
    let banco = []

    if (banco_ls != null && banco_ls.length > 0) {
        const object_ls = JSON.parse(banco_ls)
        banco = object_ls
    } 
    return banco;
}

const addItem = (dados) => {
    const banco = getBanco()
    
    banco.push(dados)

    const n_banco = JSON.stringify(banco)
    //setar: associo valor a algo
    localStorage.setItem(banco_chave, n_banco) 
}

const updateItem = (index, dados) => {
    const banco = getBanco()

    banco[index] = dados

    const n_banco = JSON.stringify(banco)
    localStorage.setItem(banco_chave, n_banco)
}

//var p guardar dados inseridos no formulario
const meuForm = document.querySelector("#name-form")

//variaveis selecionando os dados inseridos em cada input - referencia da input que vc usa
const inputs = {
    id: document.querySelector('input[name="id"]'),
    nome: document.querySelector('input[name="nome"]'),
    email: document.querySelector('input[name="email"]'),
    celular: document.querySelector('input[name="celular"]'),
    cidade: document.querySelector('input[name="cidade"]')
}

//escutar toda vez q ele for enviar o formulario
meuForm.addEventListener("submit", function btnEnviaForm(event) {
    //evitar o evento padrão - n quero que recarregue a pagina
    event.preventDefault();

    //pego valores da input
    const usuarioDados = {
        //chave: valor
        nome: inputs.nome.value,
        email: inputs.email.value,
        celular: inputs.celular.value,
        cidade: inputs.cidade.value
    }

    //condição para editar os valores
    if(inputs.id.value != ''){
        updateItem(inputs.id.value, usuarioDados)
    } else {
        addItem(usuarioDados)
    }

    //esvaziar os dados das inputs apos enviar
    for(let i in inputs){
        inputs[i].value = ''
    }

    //regera a lista dos clientes
    listar()
})

const listar = () => {
    const banco = getBanco()

    const tbody = document.querySelector('.dadosForm')
    //esvazio o tbody p quando eu abrir n ter nada
    tbody.innerHTML = ''

    for (let index = 0; index < banco.length; index++) {
        const cliente = banco[index]
        
        const tr = document.createElement('tr')

        const tdNome = document.createElement('td')
        tdNome.innerText = cliente.nome

        const tdCidade = document.createElement('td')
        tdCidade.innerText = cliente.cidade

        const tdCelular = document.createElement('td')
        tdCelular.innerText = cliente.celular

        const tdEmail = document.createElement('td')
        tdEmail.innerText = cliente.email

        const tdAcao = document.createElement('td')
        tdAcao.innerHTML = `
            <button id="delete-${index}" class="botaoDelete" onclick="removeIten(${index})">Apagar</button>
            <button id="edit-${index}" type="button" onclick="editButton(${index})">Editar</button>
        `
        tr.appendChild(tdNome)
        tr.appendChild(tdCidade)
        tr.appendChild(tdCelular)
        tr.appendChild(tdEmail)
        tr.appendChild(tdAcao)

        tbody.appendChild(tr)
    }
}

const removeIten = (index) => {    
    const banco = getBanco()

    //indice, e a quantidade de elementos q quero retirar
    banco.splice(index, 1);

    const n_banco = JSON.stringify(banco)
    //setar: atribuir valor a algo
    localStorage.setItem(banco_chave, n_banco) 

    listar()
}

const editButton = (index) => {
    const banco = getBanco()

    //seleciona os dados conforme o index
    const cliente = banco[index]

    //pega os valores e preenche no modal
    inputs.id.value = index
    inputs.nome.value = cliente.nome
    inputs.email.value = cliente.email
    inputs.celular.value = cliente.celular
    inputs.cidade.value = cliente.cidade

    //abre o modal
    toggleModal()
}
//chamar para quando atualizar os dados adicionados aparecerem
listar();
