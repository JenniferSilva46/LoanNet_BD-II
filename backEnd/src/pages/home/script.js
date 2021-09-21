let map;
let marker;

let center = {
    lat: -9.826044705294152,
    lng: -56.56730846033254
};


const buscaLivro = () => {
    fetch("http://localhost:8080/book/getAll", {})
        .then(res => res.json())
        .then(data => {
            createBook(data)
        })
}

buscaLivro()

const createBook = (data) => {
    data.forEach(element => {
        const cardlivro = document.createElement('div')
        const img = document.createElement('img')
        img.src = element.image
        const titulo = document.createElement('h3')
        titulo.textContent = element.title
        const sinopse = document.createElement('strong')
        sinopse.textContent = element.synopsis
        document.querySelector('.livros').appendChild(cardlivro)
        cardlivro.appendChild(img)
        cardlivro.appendChild(titulo)
        cardlivro.appendChild(sinopse)
        cardlivro.classList.add("card-livro");

        img.onclick = function () {
            const salvo = element;
            createBookDetail(salvo);
        }

    });
}

const createBookDetail = (salvo) => {
    const bodyDetail = document.createElement('div');
    const buttonDetail = document.createElement('button');
    //    buttonDetail.setAttribute('onclick')
    console.log(salvo);


    buttonDetail.textContent = "X"
    document.querySelector('.livros').appendChild(bodyDetail);
    buttonDetail.classList.add("button-model");
    bodyDetail.classList.add("body-detail");
    bodyDetail.appendChild(buttonDetail);
    document.querySelector(".body-detail").style.display = "block";
    buttonDetail.addEventListener('click', createModel);
    const titleMap = document.createElement('h4');
    titleMap.textContent = "Localição do Usuário, clique no marcador para aproximar"
    bodyDetail.appendChild(titleMap)
    const mapGoogle = document.createElement('div');
    bodyDetail.appendChild(mapGoogle);
    mapGoogle.classList.add("map");


    structModel(salvo);
    initMap(salvo);
}

const createModel = () => {
    const detail = document.querySelector(".body-detail");
    if (document.querySelector(".body-detail").style.display == "block") {
        document.querySelector(".body-detail").style.display = "none";
        document.querySelector('.livros').removeChild(detail);
    } else {
        document.querySelector(".body-detail").style.display = "block";
    }
}

const structModel = (obj) => {
    const cardlivro = document.createElement('div');
    const img = document.createElement('img');
    const titulo = document.createElement('h3');
    const nameContact = document.createElement('h3');
    const contact = document.createElement('a');
    const author = document.createElement('h3');
    const genre = document.createElement('h3');
    const sinopse = document.createElement('strong');
    img.src = obj.image
    titulo.textContent = "Título: " + obj.title
    nameContact.textContent = "Nome para contato: " + obj.namecontact
    contact.href = "https://api.whatsapp.com/send?phone=+55" + obj.contact
    contact.textContent = "Telefone: " + obj.contact
    //<a href={"https://api.whatsapp.com/send?phone=+55"+obj.TELEFONE} target="z-index">
    author.textContent = "Autor: " + obj.author
    genre.textContent = "Género: " + obj.genre
    sinopse.textContent = "Sinopse: " + obj.synopsis
    document.querySelector('.body-detail').appendChild(cardlivro);
    cardlivro.appendChild(img);
    cardlivro.appendChild(titulo);
    cardlivro.appendChild(author);
    cardlivro.appendChild(genre);
    cardlivro.appendChild(nameContact);
    cardlivro.appendChild(contact);
    cardlivro.appendChild(sinopse);
    cardlivro.classList.add("card-livro-model");

}

const initMap = (obj) => {
    map = new google.maps.Map(document.querySelector(".map"), {
        center: center,
        zoom: 4,
    });

    const markerPoint = {
        lat: obj.st_x,
        lng: obj.st_y
    }
    console.log(markerPoint);
    const marker = new google.maps.Marker({
        map: map,
        position: markerPoint
    })
    map.addListener("center_changed", () => {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(() => {
            map.panTo(marker.getPosition());
        }, 3000);
    });
    marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
    });


}