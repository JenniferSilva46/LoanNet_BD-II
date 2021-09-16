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
        console.log(element);
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
    });
}