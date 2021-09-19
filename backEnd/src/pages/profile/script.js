const buscaLivro = () => {
  fetch("http://localhost:8080/book/getBook", {})
    .then((res) => res.json())
    .then((data) => {
      createBook(data);
    });
};

buscaLivro();

const createBook = (data) => {
  data.forEach((element) => {
    const cardlivro = document.createElement("div");
    const img = document.createElement("img");
    img.src = element.image;
    const titulo = document.createElement("h3");
    titulo.textContent = element.title;
    const sinopse = document.createElement("strong");
    sinopse.textContent = element.synopsis;
    document.querySelector(".livros").appendChild(cardlivro);
    cardlivro.appendChild(img);
    cardlivro.appendChild(titulo);
    cardlivro.appendChild(sinopse);
    cardlivro.classList.add("card-livro");

    img.onclick = function () {
      const salvo = element;
      displayInput();

      data(salvo);
    };
  });
};

const displayInput = () => {
  const email = document.querySelector("#email");
  if (document.querySelector("#email").style.display == "block") {
    document.querySelector("#email").style.display = "none";
    // document.querySelector('.livros').removeChild(detail);
  } else {
    document.querySelector("#email").style.display = "block";
  }
};

function data(salvo) {
  const obj = {
    idUser: salvo.id_user,
    nameUser: salvo.namecontact,
    idBook: salvo.id_book,
    titleBook: salvo.title,
  };

  fetchData(obj);
}

const fetchData = (obj) => {
  fetch("http://localhost:8080/loan/sender", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.auth == true) {
        localStorage.setItem("token", data.token);
        alert("Logado com sucesso!" + data.token);
      } else if (data) {
        alert(data);
      }
    });
};
