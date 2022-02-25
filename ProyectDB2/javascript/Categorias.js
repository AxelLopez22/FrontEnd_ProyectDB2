const d = document,
$form = d.querySelector(".FrmCat"),
$table = d.querySelector(".tableInv1"),
$templateInv = d.getElementById("ListCategory").content,
$fragmentInv = d.createDocumentFragment();

$(document).ready(function(){

});

const GetProd = async () => {
    try {
        let res = await fetch('http://localhost:5555/Categoria'),
        json = await res.json();

        if(!res.ok) throw {status:res.status,statusText:res.statusText}
        console.log(json);
        json.forEach(el => {
            $templateInv.querySelector(".Nombre").textContent = el.StrCategory;
            $templateInv.querySelector(".Categoria").textContent = el.UniqIdcategoryfather;
            $templateInv.querySelector(".CategoriaPadre").textContent = el.BitSubcategory;
            $templateInv.querySelector(".Mod").dataset.id = el.id;
            $templateInv.querySelector(".Mod").dataset.Nombre = el.StrCategory;
            $templateInv.querySelector(".Mod").dataset.select = el.BitSubcategory;
            $templateInv.querySelector(".Mod").dataset.selectCat = el.UniqIdcategoryfather;
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
                        StrCategory:e.target.Nombre.value,
                        BitSubcategory:e.target.select.value,
                        UniqIdcategoryfather:e.target.selectCat.value,
                        BitStatus:true
                    })
                },
                res = await fetch('http://localhost:5555/Categoria',options);
                json = await res.json();

                console.log(JSON);

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
                        StrCategory:e.target.Nombre.value,
                        BitSubcategory:e.target.select.value,
                        UniqIdcategoryfather:e.target.selectCat.value,
                        BitStatus:true
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
    e.preventDefault();
    if(e.target.matches(".Mod")){
        $form.Nombre.value = e.target.dataset.StrCategory;
        $form.select.value = e.target.dataset.BitSubcategory;
        $form.selectCat.value = e.target.dataset.UniqIdcategoryfather;
        $form.id.value = e.target.dataset.id;
    }

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


const $OptionSelect = document.getElementById("OptionSelect"),
 $OptionCategory = document.getElementById("OptionCategory");

 
 function SelectOpc(){

 }
 function LoadCategory(value){
    
        fetch("http://localhost:5555/Categoria")
        .then(res => res.ok ? res.json():Promise.reject(res))
        .then(json => {
            console.log(json);
            let $option = `<option value="">Elige a que categoria pertenece</option>`;

            json.forEach(el => $option += `<option value="${el.id}">${el.StrCategory}</option>`);
            $OptionCategory.innerHTML = $option;
        })
        .catch(err => {
            console.log(err);
        })
 }

 document.addEventListener("DOMContentLoaded",LoadCategory);
// $OptionSelect.addEventListener("change", e => LoadCategory(e.target.value));
//