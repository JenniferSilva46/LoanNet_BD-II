let objAddMatch;
let arrayLoan = [];
let arrayID = [];
let arrayEmailLoan = [];
let objMatch;
let isBoolean = false;
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
    const id = document.createElement("spam");
    id.type = "text";
    id.textContent = element.id_book;
    const img = document.createElement("img");
    img.src = element.image;
    const titulo = document.createElement("h3");
    titulo.textContent = element.title;
    const sinopse = document.createElement("strong");
    sinopse.textContent = element.synopsis;
    const inputDevolution = document.createElement("input");
    inputDevolution.type = "checkbox";
    inputDevolution.classList.add("input-devolution");
    document.querySelector(".livros").appendChild(cardlivro);
    cardlivro.appendChild(img);
    cardlivro.appendChild(titulo);
    cardlivro.appendChild(sinopse);
    cardlivro.appendChild(inputDevolution);
    cardlivro.appendChild(id);
    id.classList.add("id-livro");
    cardlivro.classList.add("card-livro");
    titulo.classList.add("titulo-livro");

    img.onclick = function () {
      const salvo = element;
      dataObj(salvo);
      displayInput(salvo);
      document.querySelector("#btn-conf").style.display = "none";
    };
  });
};

//exibir ou esconder o input e botão do email
const displayInput = (obj) => {
  const buttonEmail = document.querySelector("#buttonEmail");
  if (document.querySelector("#email").style.display == "block") {
    document.querySelector("#email").style.display = "none";
    // document.querySelector('.livros').removeChild(detail);
  } else {
    document.querySelector("#email").style.display = "block";
    buttonEmail.onclick = () => {
      const email = document.querySelector("#emailUser");
      fetchAddressee(email.value);
      displayButton(obj);
    }
  }
  return
};

//exibir ou esconder o botão de estou certo
const displayButton = (obj) => {
  const buttonConf = document.querySelector("#buttonConf");
  if (document.querySelector("#btn-conf").style.display == "block") {
    document.querySelector("#btn-conf").style.display = "none";
    // document.querySelector('.livros').removeChild(detail);
  } else {
    document.querySelector("#btn-conf").style.display = "block";
    const email = document.querySelector("#emailUser");
    buttonConf.addEventListener("click", event => {
      fetchAddressee(email.value);
      document.querySelector("#email").style.display = "none";
    })
  }

}

//criando obj do remetente
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
//Criar remetente
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

//busca o usuário que vai ser o destinatario
const fetchAddressee = (email) => {
  fetch(`http://localhost:8080/user/getUser/${email}`)
    .then((res) => res.json())
    .then((data) => {
      createAddressee(data);
    });
}

//criar o nó do destinatario
const createAddressee = (obj) => {
  const objAddressee = {
    idUser: obj[0]._id,
    nameUser: obj[0].name
  }

  objAddMatch[1] = {
    idUser: objAddressee.idUser
  };
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

//Cria o relacionamento de emprestimo
const createAddLoan = () => {
  objMatch = {
    idBook: objAddMatch[0].idBook,
    idUser: objAddMatch[1].idUser
  }
  arrayLoan.push(objMatch);
  console.log(arrayLoan);

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
        loanVerifyc();
      }
    })
}

//
const loanVerifyc = () => {
  document.querySelector(".id-devolution").style.display = "block";
  document.querySelector(".button-devolution").style.display = "block";
  const idRemove = document.querySelector(".id-livro");
  const titleRemove = document.querySelector(".titulo-livro");
  const livros = document.querySelectorAll(".livros");
  livros.forEach((element) => {
    const livro = document.querySelectorAll(".card-livro");
    livro.forEach((element) => {
      const id = document.querySelector(".id-livro").innerText
      idRemove.classList.remove("id-livro");
      const titleBook = document.querySelector(".titulo-livro").innerText
      titleRemove.classList.remove("titulo-livro");
      arrayLoan.forEach(function (obj, index) {
        // console.log(arrayLoan[index].idBook + "id img" + arrayID[index]);
        if (arrayID[index] != arrayLoan[index].idBook && id == arrayLoan[index].idBook) {
          arrayID.push(id);
          arrayEmailLoan.push(titleBook);
        }
      })
    })
    console.log(arrayID);
    console.log(arrayEmailLoan);
  })
  idRemove.classList.add("id-livro");
  titleRemove.classList.add("titulo-livro");

  console.log(livros[0]);
  const inputDevolution = document.querySelector(".id-devolution");
  const listLoan = document.createElement("ul");
  const listLoanLi = document.createElement("li");
  const textDevolution = document.createElement("h3");
  textDevolution.textContent = "Os livros que foram emprestados são:"
  listLoan.appendChild(listLoanLi);
  inputDevolution.appendChild(textDevolution);
  inputDevolution.appendChild(listLoan);
  //const buttonDevolution = document.createElement("button");
  const buttonDevolution = document.querySelector(".button-devolution");
  buttonDevolution.textContent = "Devolvido";
  const idDevolution = document.querySelector(".id-devolution");

  buttonDevolution.classList.add("button-devolution");
  arrayEmailLoan.forEach((element, index) => {
    listLoanLi.textContent = arrayEmailLoan[index];
    inputDevolution.appendChild(listLoan);
    idDevolution.appendChild(buttonDevolution);
    listLoan.appendChild(listLoanLi);
  })
  // if (!inputDevolution.checked) {
  //   inputDevolution.checked = true;
  // }

}
const buttonDevolution = document.querySelector(".button-devolution");
buttonDevolution.addEventListener("click", event => {
  arrayLoan.forEach((element) => {
    devolutionBook(element);
    arrayLoan.shift();
    console.log(arrayLoan);
    console.log("arrayLoan");
  })
  if (arrayLoan.length == 0) {
    arrayEmailLoan.splice(0, arrayEmailLoan.length);
    arrayID.splice(0, arrayID.length);
    console.log(arrayID);
    console.log(arrayEmailLoan);
    alert("Livros disponiveis para emprestimo!");
    if (document.querySelector(".id-devolution").style.display == "block") {
      document.querySelector(".id-devolution").style.display = "none";
      // document.querySelector('.livros').removeChild(detail);
    } else {
      document.querySelector(".id-devolution").style.display = "block";
    }
  }
})

const devolutionBook = (obj) => {
  console.log(obj);
  fetch("http://localhost:8080/loan/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
    .then((res) => res.json())
    .then(response => {
      if (response.loan == true) {
        console.log("removeu");
      }
    })

}