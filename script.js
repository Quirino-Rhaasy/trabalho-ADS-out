const container = document.getElementById('cards-container');
const campoBusca = document.getElementById('campo-busca');
const btnBuscar = document.getElementById('btn-buscar');

// Função principal que consome a API usando fetch
function buscarPersonagens(nome = '') {
    let url = 'https://rickandmortyapi.com/api/character';
    
    if (nome) {
        url += `/?name=${encodeURIComponent(nome)}`;
    }

    container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Carregando personagens...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Personagem não encontrado.');
            }
            return response.json();
        })
        .then(dados => {
            renderizarCards(dados.results);
        })
        .catch(erro => {
            container.innerHTML = `<p class="mensagem-erro">Nenhum personagem encontrado com esse nome.</p>`;
            console.error('Erro na requisição:', erro);
        });
}

// Função que cria os elementos HTML dinamicamente no DOM
function renderizarCards(personagens) {
    container.innerHTML = '';

    personagens.forEach(personagem => {
        // 1. Cria o card principal
        const card = document.createElement('div');
        card.classList.add('card');

        // 2. Cria a imagem
        const img = document.createElement('img');
        img.src = personagem.image;
        img.alt = personagem.name;

        // 3. Cria a área de informações
        const info = document.createElement('div');
        info.classList.add('card-info');

        // 4. Cria o título (Nome)
        const titulo = document.createElement('h2');
        titulo.textContent = personagem.name;

        // 5. Cria os textos adicionais (Espécie e Origem)
        const especie = document.createElement('p');
        especie.textContent = `Espécie: ${personagem.species}`;

        const origem = document.createElement('p');
        origem.textContent = `Origem: ${personagem.origin.name}`;

        // 6. Cria o indicador de Status
        const status = document.createElement('span');
        status.classList.add('status-badge');
        
        if (personagem.status === 'Alive') {
            status.textContent = 'Vivo';
            status.classList.add('vivo');
        } else if (personagem.status === 'Dead') {
            status.textContent = 'Morto';
            status.classList.add('morto');
        } else {
            status.textContent = 'Desconhecido';
            status.classList.add('desconhecido');
        }

        // 7. Monta a hierarquia usando appendChild
        info.appendChild(titulo);
        info.appendChild(especie);
        info.appendChild(origem);
        info.appendChild(status);

        card.appendChild(img);
        card.appendChild(info);

        // 8. Adiciona o card pronto ao contêiner da página
        container.appendChild(card);
    });
}

// Eventos para o botão e tecla Enter na busca
btnBuscar.addEventListener('click', () => {
    buscarPersonagens(campoBusca.value.trim());
});

campoBusca.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        buscarPersonagens(campoBusca.value.trim());
    }
});

// Carrega os personagens iniciais assim que a página abre
buscarPersonagens();
