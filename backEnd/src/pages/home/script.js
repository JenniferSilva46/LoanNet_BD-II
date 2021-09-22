let map;
let marker;

let center = {
    lat: -9.826044705294152,
    lng: -56.56730846033254
};


const searchBook = () => {
    fetch("http://localhost:8080/book/getAll", {})
        .then(res => res.json())
        .then(data => {
            createBook(data)
        })
}

searchBook()

const createBook = (data) => {
    data.forEach(element => {
        const cardbook = document.createElement('div')
        const img = document.createElement('img')
        img.src = element.image
        const title = document.createElement('h3')
        title.textContent = element.title
        const sinopse = document.createElement('strong')
        sinopse.textContent = element.synopsis
        document.querySelector('.books').appendChild(cardbook)
        cardbook.appendChild(img)
        cardbook.appendChild(title)
        cardbook.appendChild(sinopse)
        cardbook.classList.add("card-book");

        img.onclick = function () {
            const save = element;
            createBookDetail(save);
        }

    });
}

const createBookDetail = (save) => {
    const bodyDetail = document.createElement('div');
    const buttonDetail = document.createElement('button');



    buttonDetail.textContent = "X"
    document.querySelector('.books').appendChild(bodyDetail);
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


    structModel(save);
    initMap(save);
}

const createModel = () => {
    const detail = document.querySelector(".body-detail");
    if (document.querySelector(".body-detail").style.display == "block") {
        document.querySelector(".body-detail").style.display = "none";
        document.querySelector('.books').removeChild(detail);
    } else {
        document.querySelector(".body-detail").style.display = "block";
    }
}

const structModel = (obj) => {
    const cardbook = document.createElement('div');
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
    author.textContent = "Autor: " + obj.author
    genre.textContent = "Género: " + obj.genre
    sinopse.textContent = "Sinopse: " + obj.synopsis
    document.querySelector('.body-detail').appendChild(cardbook);
    cardbook.appendChild(img);
    cardbook.appendChild(titulo);
    cardbook.appendChild(author);
    cardbook.appendChild(genre);
    cardbook.appendChild(nameContact);
    cardbook.appendChild(contact);
    cardbook.appendChild(sinopse);
    cardbook.classList.add("card-book-model");

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