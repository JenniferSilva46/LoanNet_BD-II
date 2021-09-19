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

    buttonDetail.textContent = "X"
    document.querySelector('.livros').appendChild(bodyDetail);
    buttonDetail.classList.add("button-model");
    bodyDetail.classList.add("body-detail");
    bodyDetail.appendChild(buttonDetail);
    document.querySelector(".body-detail").style.display = "block";
    buttonDetail.addEventListener('click', createModel);
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
    console.log(obj);
    const cardlivro = document.createElement('div');
    const img = document.createElement('img');
    const titulo = document.createElement('h3');
    const nameContact = document.createElement('strong');
    const contact = document.createElement('h3');
    const author = document.createElement('h3');
    const genre = document.createElement('strong');
    const sinopse = document.createElement('strong');
    img.src = obj.image
    titulo.textContent = obj.title
    nameContact.textContent = obj.nameContact
    contact.textContent = ":" + obj.contact
    author.textContent = obj.author
    genre.textContent = obj.genre
    sinopse.textContent = obj.synopsis
    document.querySelector('.body-detail').appendChild(cardlivro);
    cardlivro.appendChild(img);
    cardlivro.appendChild(titulo);
    cardlivro.appendChild(nameContact);
    cardlivro.appendChild(contact);
    cardlivro.appendChild(author);
    cardlivro.appendChild(genre);
    cardlivro.appendChild(sinopse);
    cardlivro.classList.add("card-livro");
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
    new google.maps.Marker({
        map: map,
        position: markerPoint
    })

}