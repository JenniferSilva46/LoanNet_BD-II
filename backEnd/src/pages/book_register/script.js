// import fetchData from '../login/script';

// console.log(fetchData)
let map;
let marker;

let center = {
  lat: -9.826044705294152,
  lng: -56.56730846033254
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 4,
  });

  marker = new google.maps.Marker({
    map: map,
    position: center,
    draggable: true,
  });

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener("position_changed", () => {
    map.setCenter(marker.position);
  });
}

function addMarker(evt) {
  marker.setPosition(evt.latLng);
}

function save() {

  const obj = {
    image: document.getElementById("image").value,
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    nameContact: document.getElementById("nameContact").value,
    contact: document.getElementById("contact").value,
    genre: document.getElementById("genre").value,
    synopsis: document.getElementById("synopsis").value,
    lat: marker.getPosition().lat(),
    lng: marker.getPosition().lng()
  };

  fetch("http://localhost:8080/book/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'x-acess-token': localStorage.getItem("token")
      },
      body: JSON.stringify(obj),
    })
    .then((response) => {
      alert("Inserido!");
      window.location.href = "file:///home/jhenniferjs/Documentos/atividades-disciplinas-2021.1/bdII/LoanNet_BD-II/backEnd/src/pages/mybooks/mybooks.html"
    })
    .catch((error) => alert("Falha ao salvar!"));
}