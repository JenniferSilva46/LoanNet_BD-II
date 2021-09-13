const button = document.querySelector('#logar');

button.addEventListener("click", event => {
    const obj = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    fetchData(obj);
});

const fetchData = (obj) => {
    // const url = 'http://localhost:8080/user/login'
    fetch("http://localhost:8080/user/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            if (data.auth == true) {
                alert("Logado com sucesso!");
            } else if (data) {
                alert(data)
            }
        })
}