const API_Url = 'https://localhost:44309';

const HTMLResponse = document.querySelector("#app");
//const tpl;

//metodo GET para obtener personas
fetch(`${API_Url}/api/person`)
.then((response) => response.json())
.then((data) => {
    console.log(data);
    HTMLResponse.innerHTML = data;
})

//metodo DELETE para eliminar personas








