const d = document,
$form = d.querySelector(".FrmCat"),
$table = d.querySelector(".tableInv1"),
$templateInv = d.getElementById("ListCategory").content,
$fragmentInv = d.createDocumentFragment();

const GetProd = async () => {
    try {
        let res = await fetch('http://localhost:5555/Categoria'),
        json = await res.json();

        if(!res.ok) throw {status:res.status,statusText:res.statusText}
        console.log(json);
        json.forEach(el => {
            $templateInv.querySelector(".NombreProducto").textContent = el.NombreProducto;
            $templateInv.querySelector(".Categoria").textContent = el.Categoria;
            $templateInv.querySelector(".Stock").textContent = el.Stock;
            $templateInv.querySelector(".Precio").textContent = el.Precio;
            $templateInv.querySelector(".Mod").dataset.id = el.id;
            $templateInv.querySelector(".Mod").dataset.NombreProducto = el.NombreProducto;
            $templateInv.querySelector(".Mod").dataset.Categoria = el.Categoria;
            $templateInv.querySelector(".Mod").dataset.Stock = el.Stock;
            $templateInv.querySelector(".Mod").dataset.Precio = el.Precio;
            $templateInv.querySelector(".Del").dataset.id = el.id;
            
            let $cloneInv = d.importNode($templateInv, true);
            $fragmentInv.appendChild($cloneInv);
        });

        $table.querySelector("tbody").appendChild($fragmentInv);
    } catch (err) {
        let message = error.statusText || "Ocurrio un error"
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${error.status}: ${message}</b></p>`)
    }
}

d.addEventListener("DOMContentLoaded", GetProd);



d.addEventListener("submit",async e => {
    
    if(e.target === $form){
        e.preventDefault();
        if(!e.target.id.value){
            //POST
            try {
                let options = {
                    method: "POST",
                    headers:{
                        "Content-type":"application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        NombreProducto:e.target.Nombre.value,
                        Categoria:e.target.Categoria.value,
                        Stock:e.target.Stock.value,
                        Precio:e.target.Precio.value
                    })
                },
                res = await fetch('http://localhost:5555/Categoria',options);
                json = await res.json();

                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}: ${message}</b></p>`)
            }
        } else {
            //PUT
            try {
                let options = {
                    method: "PUT",
                    headers:{
                        "Content-type":"application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        NombreProducto:e.target.Nombre.value,
                        Categoria:e.target.Categoria.value,
                        Stock:e.target.Stock.value,
                        Precio:e.target.Precio.value
                    })
                },
                res = await fetch(`http://localhost:5555/Categoria/${e.target.id.value}`,options);
                json = await res.json();

                
                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}: ${message}</b></p>`)
            }
        }
    }
});


d.addEventListener("click", async e => {
    if(e.target.matches(".Mod")){
        $form.Nombre.value = e.target.dataset.NombreProducto;
        $form.Categoria.value = e.target.dataset.Categoria;
        $form.Stock.value = e.target.dataset.Stock;
        $form.Precio.value = e.target.dataset.Precio;
        $form.id.value = e.target.dataset.id;
    }

    console.log(e.target.dataset.Precio);

    if(e.target.matches(".Del")){
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
                res = await fetch(`http://localhost:5555/Categoria/${e.target.dataset.id}`,options);
                json = await res.json();

                if(!res.ok) throw {status:res.status,statusText:res.statusText}
                
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error"
                $form.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}: ${message}</b></p>`)
            }
        }
    }
});

//