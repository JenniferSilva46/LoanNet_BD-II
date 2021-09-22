const button = document.querySelector('#log');

button.addEventListener("click", event => {
    const obj = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
    }
    fetchData(obj);
});

const fetchData = (obj) => {
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
                localStorage.setItem("token", data.token);
                alert("Logado com sucesso!");
                window.location.href = "file:///home/jhenniferjs/Documentos/atividades-disciplinas-2021.1/bdII/LoanNet_BD-II/backEnd/src/pages/home/home.html"

            }
        })
}