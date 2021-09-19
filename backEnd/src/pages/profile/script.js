let objAddMatch;
let objMatch;

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
    const buttonDevolution = document.createElement("button");
    buttonDevolution.textContent = "Devolvido";
    document.querySelector(".livros").appendChild(cardlivro);
    cardlivro.appendChild(img);
    cardlivro.appendChild(titulo);
    cardlivro.appendChild(sinopse);
    cardlivro.appendChild(buttonDevolution);
    cardlivro.classList.add("card-livro");
    buttonDevolution.classList.add("button-devolution");

    img.onclick = function () {
      const salvo = element;
      dataObj(salvo);

      displayInput();
    };
  });
};

const displayInput = () => {
  const buttonEmail = document.querySelector("#buttonEmail");
  if (document.querySelector("#email").style.display == "block") {
    document.querySelector("#email").style.display = "none";
    // document.querySelector('.livros').removeChild(detail);
  } else {
    document.querySelector("#email").style.display = "block";
    const email = document.querySelector("#emailUser");
    buttonEmail.onclick = () => {
      fetchAddressee(email.value);
    }
  }
  return
};

const dataObj = (salvo) => {
  const obj = {
    idUser: salvo.id_user,
    nameUser: salvo.namecontact,
    idBook: salvo.id_book,
    titleBook: salvo.title,
  };
  objAddMatch = [{
    idBook: obj.idBook
  }]
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
};

const fetchAddressee = (email) => {
  fetch(`http://localhost:8080/user/getUser/${email}`)
    .then((res) => res.json())
    .then((data) => {
      createAddressee(data);
    });
}

const createAddressee = (obj) => {
  const objAddressee = {
    idUser: obj[0]._id,
    nameUser: obj[0].name
  }

  objAddMatch[1] = {
    idUser: objAddressee.idUser
  };
  console.log(objAddMatch);
  fetch("http://localhost:8080/loan/addressee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objAddressee),
    })
    .then((res) => res.json())
  const buttonConf = document.querySelector("#buttonConf");
  buttonConf.onclick = function () {
    createAddLoan();

  }
}

const createAddLoan = () => {
  objMatch = {
    idBook: objAddMatch[0].idBook,
    idUser: objAddMatch[1].idUser
  }
  fetch("http://localhost:8080/loan/addLoan", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(objMatch),
    })
    .then((res) => res.json())
    .then(response => {
      if (response.loan == true) {
        devolutionBook()
      }
    })
}

const devolutionBook = () => {
  const buttonDevolution = document.querySelector(".button-devolution");
  buttonDevolution.onclick = function () {
    fetch("http://localhost:8080/loan/delete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objMatch),
      })
      .then((res) => res.json())
      .then(response => {
        if (response.loan == true) {}
      })
  }
}