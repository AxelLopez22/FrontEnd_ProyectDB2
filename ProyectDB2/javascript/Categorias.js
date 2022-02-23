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