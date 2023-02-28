//Tarefas
//Acessar cada tag com classe
//Pegar o evento do click 


const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const Tarefas = document.querySelector('.tarefas')

function criaLi () {
    const li = document.createElement('li');
    return li;
};

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
};

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    Tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
};

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
};

inputTarefa.addEventListener('keypress', function(event) {
       if(event.keyCode === 13){
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
        limpaInput();
    }
});

btnTarefa.addEventListener('click',function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
});

document.addEventListener('click', function(event) {
    const el = event.target

    if(el.classList.contains('apagar')) {
        console.log('Apagar Clicado')
        el.parentElement.remove();
        salvarTarefas()
    }
});
 
function salvarTarefas() {
        const liTarefas = Tarefas.querySelectorAll('li');
        const listaDeTarefas =  [];

            for (let tarefa of liTarefas) {
            
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
            listaDeTarefas.push(tarefaTexto)
        }
        
        //Save string
        const tarefasJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
}; 

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
};
adicionaTarefasSalvas();
