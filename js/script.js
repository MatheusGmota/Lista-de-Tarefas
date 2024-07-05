const descricao = document.getElementById('descricao');
const inputTarefa = document.getElementById('inputTarefa');
const listaTarefa = document.getElementById('lista-tarefas');
const tarefasContent = document.querySelector('.wrap-tarefa');


if (localStorage.getItem("lista-tarefas") == null) {
    let listaDeTarefas = [];
    localStorage.setItem("lista-tarefas", JSON.stringify(listaDeTarefas));
}
else {
    const lista = JSON.parse(localStorage.getItem("lista-tarefas")) || [];
    for (let i = 0; i < lista.length; i++){
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${lista[i].nomeTarefa}</span>
            <div>
                <button class="icon btn-editar" onclick="editarTarefa(this.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="icon btn-deletar" onclick="deletaTarefa(this.parentElement)"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        tarefasContent.classList.remove('hidden');
        listaTarefa.appendChild(li);
    }
}

function adicionaTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    if (textoTarefa !== '') {
        addLocalStorage(textoTarefa);
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${textoTarefa}</span>
            <div>
                <button class="icon btn-editar" onclick="editarTarefa(this.parentElement)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="icon btn-deletar" onclick="deletaTarefa(this.parentElement)"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
                    
        tarefasContent.classList.remove('hidden');
        listaTarefa.appendChild(li);
        inputTarefa.value = "";
        descricao.value = ""; 
    }
}

function addLocalStorage(textoTarefa) {
    const tarefa = {
        nomeTarefa: textoTarefa
    };

    let listaDeTarefas = JSON.parse(localStorage.getItem("lista-tarefas")) || [];
    listaDeTarefas.push(tarefa);
    localStorage.setItem("lista-tarefas", JSON.stringify(listaDeTarefas));
}

function editarTarefa(div) {
    const li = div.parentElement;
    const span = li.querySelector('span');
    const textoEditado = prompt("Editar mensagem: ", span.textContent);

    if (textoEditado !== null && textoEditado.trim() !== "") {
        const lista = JSON.parse(localStorage.getItem("lista-tarefas")) || [];
        for (let i = 0; i < lista.length; i++){
            span.textContent = textoEditado;
            lista.splice(lista[i].nomeTarefa.indexOf(span.textContent),1);
            localStorage.setItem("lista-tarefas", JSON.stringify(lista));
            addLocalStorage(textoEditado);
        }
    }
    
}


function deletaTarefa(div) {
    const li = div.parentElement;
    const ul = li.parentElement;
    const span = li.querySelector('span');

    ul.removeChild(li)
    if (ul.innerHTML === "") {
        tarefasContent.classList.add('hidden');
    }

    const lista = JSON.parse(localStorage.getItem("lista-tarefas")) || [];
    for (let i = 0; i < lista.length; i++){

        if(lista[i].nomeTarefa  == span.textContent) {
            lista.splice(i,1);
            localStorage.setItem("lista-tarefas", JSON.stringify(lista));
        }
    }

}