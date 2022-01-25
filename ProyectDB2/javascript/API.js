const API_Url = `C:\Users\Jarvin\Desktop\API Prueba\backend_system_magbussines\WebAPIProyectBDTest\WebAPIProyectBDTest.sln`;

//const HTMLResponse = document.querySelector("#app");

const xhr = new XMLHttpRequest();

async function onRequestHandler(){
    if (this.readyState == 4 && this.status == 200) {

        const data = await JSON.parse(this.response);
        console.log(data);
        //const HTMLResponse = document.querySelector("#app");
        //const User = data.map((user) => `<li>${user.name} @${user.email}</li>`);
        //HTMLResponse.innerHTML = `<ul>${User}</ul>`
    }
}

xhr.addEventListener("load", onRequestHandler);
xhr.open("httpGet", `${API_Url}/api/[controller]`);

