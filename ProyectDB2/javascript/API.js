
//METODO GET ALL
const d = document,
    $table = d.querySelector(".CrudTable"),
    $form = d.querySelector(".formcrud"),
    $tittle = d.querySelector(".Crud_tittle"),
    $template = d.getElementById("crud-template").content,
    $fragment = document.createDocumentFragment();

    const GetAll = async () => {
        try {
            let res = await fetch('http://localhost:5555/Persona'),
            json = await res.json();
            if(!res.ok) throw {status:res.status,statusText:res.statusText}
            console.log(json);
            json.forEach(el => {
                $template.querySelector(".Nombre").textContent = el.Nombre;
                $template.querySelector(".Apellido").textContent = el.Apellidos;
                $template.querySelector(".Email").textContent = el.Email;
                $template.querySelector(".Edit").dataset.id = el.id
                $template.querySelector(".Edit").dataset.Nombre = el.Nombre;
                $template.querySelector(".Edit").dataset.Apellido = el.Apellidos;
                $template.querySelector(".Edit").dataset.Email = el.Email;
                $template.querySelector(".Delete").dataset.id = el.id;
                console.log(el.Apellidos);

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            });

            $table.querySelector("tbody").appendChild($fragment);
        } catch (error) {
            let message = error.statusText || "Ocurrio un error"
            $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}: ${message}</b></p>`)
        }
    }

d.addEventListener("DOMContentLoaded", GetAll);


//CRUD
d.addEventListener("submit",async e => {
    if(e.target === $form){
        e.preventDefault();
        if(!e.target.id.value){
            //CreatePOST
            try {
                let options = {
                    method: "POST",
                    headers:{
                        "Content-type":"application/json; charset=utf-8" 
                    },
                    body:JSON.stringify({
                        Nombre:e.target.Nombre.value,
                        Apellidos:e.target.Apellido.value,
                        Email:e.target.Correo.value
                    })
                },
                res = await fetch('http://localhost:5555/Persona',options);
                json = await res.json();
                
                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}: ${message}</b></p>`)
            }
            
        } else {
            //UpdatePUT
            try {
                let options = {
                    method: "PUT",
                    headers:{
                        "Content-type":"application/json; charset=utf-8" 
                    },
                    body:JSON.stringify({
                        Nombre:e.target.Nombre.value,
                        Apellido:e.target.Apellidos.value,
                        Email:e.target.Correo.value
                    })
                },
                res = await fetch(`http://localhost:5555/Persona/${e.target.id.value}`,options);
                json = await res.json();

                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}: ${message}</b></p>`)
            }
        }
    }
});

d.addEventListener("click",async e => {
    if(e.target.matches('.Edit')){
        $tittle.textContent = 'Editar Persona';
        $form.Nombre.value = e.target.dataset.Nombre;
        $form.Apellido.value = e.target.dataset.Apellido;
        $form.Correo.value = e.target.dataset.Email;
        $form.id.value = e.target.dataset.id;
        //console.log(e.target.dataset.Nombre);
    }

    if(e.target.matches(".Delete")){
        let isDelete = confirm(`¿Quieres eliminar el id? ${e.target.dataset.id}`)

        if(isDelete){
            //DELETE
            try {
                let options = {
                    method: "DELETE",
                    headers:{
                        "Content-type":"application/json; charset=utf-8" 
                    }
                },
                res = await fetch(`http://localhost:5555/Persona/${e.target.dataset.id}`,options);
                json = await res.json();

                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                
                location.reload();
            } catch (error) {
                let message = error.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}: ${message}</b></p>`)
            }
        }
    }
});

//GET
/** 
const URL = 'http://localhost:3000'
const $fetch = document.getElementById('Fetch');
    
    
fetch(`${URL}/Persona`)
.then((response) => response.ok ? response.json():Promise.reject(response))
.then((json) => {
    //console.log(json);
    json.forEach((el) => {
       const $li = document.createElement("li");
       $li.innerHTML = `${el.id} --- ${el.Nombre} --- ${el.Apellidos} --- ${el.Email}`;
       $fragment.appendChild($li); 
    });
    $fetch.appendChild($fragment);
})
.catch((err) => {
    let message = err.statusText || 'Ocurrio un error';
    $fetch.innerHTML = `Error ${err.status} ${message}`;
})
*/




