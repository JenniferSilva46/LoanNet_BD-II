const getId = () => {
  fetch("http://localhost:8080/user/getUserId", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'x-acess-token': localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      createData(data);
    })
}

getId()

const createData = (data) => {
  const dataDiv = document.createElement("div");
  const name = document.createElement("p");
  name.textContent = 'Nome: ' + data.name;
  const email = document.createElement("p");
  email.textContent = 'Email: ' + data.email;
  const phone = document.createElement("p");
  phone.textContent = 'Contato: ' + data.phone;

  document.querySelector(".data-user").appendChild(dataDiv);
  dataDiv.appendChild(name);
  dataDiv.appendChild(email);
  dataDiv.appendChild(phone);
}

function exit() {
  localStorage.removeItem('token');

}