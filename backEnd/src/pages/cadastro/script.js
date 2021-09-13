const button = document.querySelector('#submit');

button.addEventListener("click", event => {
    const obj = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        phone: document.querySelector('#tel').value
    };

    fetch("http://localhost:8080/user/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            alert('Inserido!')
        })
        .catch(error => alert('Falha ao salvar!'));
});