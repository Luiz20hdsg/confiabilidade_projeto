var map; // Variável global para o mapa

// Função de inicialização do mapa
function initMap() {
    // Coordenadas do centro do mapa (exemplo: São Francisco)
    var center = { lat: 37.7749, lng: -122.4194 };

    // Opções de visualização do mapa
    var mapOptions = {
        center: center,
        zoom: 10 // Nível de zoom inicial
    };

    // Criação do mapa
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Adicionar evento de clique no mapa para adicionar marcador
    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });

    // Buscar ícones do backend e adicioná-los ao mapa
    buscarIcones();
}

// Função para buscar ícones do backend e adicioná-los ao mapa
function buscarIcones() {
    fetch('/api/icons') // Faz uma solicitação GET para a rota /api/icons no backend
        .then(response => response.json())
        .then(icones => {
            // Itera sobre os ícones recebidos e adiciona marcadores ao mapa
            icones.forEach(icone => {
                var marker = new google.maps.Marker({
                    position: { lat: icone.latitude, lng: icone.longitude },
                    map: map,
                    title: icone.nome
                });
            });
        })
        .catch(error => console.error('Erro ao buscar ícones:', error));
}

// Função para criar um novo ícone no backend e adicioná-lo ao mapa
function criarIcone(location) {
    fetch('/api/icons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: location.lat(),
            longitude: location.lng(),
            nome: 'Novo Ícone' // Nome padrão para o novo ícone
            // Outros campos podem ser adicionados conforme necessário
        })
    })
    .then(response => response.json())
    .then(novoIcone => {
        // Adicionar marcador para o novo ícone ao mapa
        var marker = new google.maps.Marker({
            position: { lat: novoIcone.latitude, lng: novoIcone.longitude },
            map: map,
            title: novoIcone.nome
        });
    })
    .catch(error => console.error('Erro ao criar ícone:', error));
}

// Função para atualizar um ícone no backend e no mapa
function atualizarIcone(id, nome) {
    fetch(`/api/icons/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome // Novo nome para o ícone
            // Outros campos podem ser atualizados conforme necessário
        })
    })
    .then(response => response.json())
    .then(iconeAtualizado => {
        // Atualizar o título do marcador no mapa
        // Para atualizações visuais em tempo real, você pode precisar remover e adicionar o marcador novamente
        // ou atualizar suas propriedades diretamente, dependendo das necessidades do seu aplicativo
    })
    .catch(error => console.error('Erro ao atualizar ícone:', error));
}

// Função para excluir um ícone no backend e no mapa
function excluirIcone(id) {
    fetch(`/api/icons/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Remover marcador do mapa
        } else {
            throw new Error('Erro ao excluir ícone');
        }
    })
    .catch(error => console.error('Erro ao excluir ícone:', error));
}

// Função para adicionar marcador ao mapa
function addMarker(location) {
    // Criação do marcador
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        draggable: true // Permitir arrastar o marcador
    });

    // Evento de clique no marcador para removê-lo
    marker.addListener('click', function() {
        // Remover marcador do mapa
        marker.setMap(null);

        // Excluir ícone no backend
        excluirIcone(id_do_icone); // Substitua 'id_do_icone' pelo ID real do ícone
    });
}

// Função para filtrar ícones com base na pesquisa
function filtrarIcones() {
    var input = document.getElementById('search').value.toLowerCase();
    // Lógica para filtrar ícones e atualizar o mapa
}

// Adicionar evento de alteração ao campo de busca
document.getElementById('search').addEventListener('input', filtrarIcones);

// Função para exibir informações adicionais sobre o ícone
function exibirInformacoes(icone) {
    var infoDiv = document.getElementById('info');
    // Lógica para exibir informações adicionais sobre o ícone clicado
}

// Evento de clique em um marcador
marker.addListener('click', function() {
    exibirInformacoes(icone);
});


document.getElementById('atualizarIcone').addEventListener('click', function() {
    var id = '01'; 
    var novoNome = 'teste'; 
    atualizarIcone(id, novoNome);
});
