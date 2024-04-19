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
        marker.setMap(null); // Remove o marcador do mapa
    });
}
