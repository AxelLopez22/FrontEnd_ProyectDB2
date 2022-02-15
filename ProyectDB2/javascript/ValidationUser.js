const NameUser = document.getElementById('NameUser');
const email = document.getElementById('email');
const Password = document.getElementById('Pass');
const form = document.getElementById('fromRegister');
const parrafo = document.getElementById('warning');

form.addEventListener("submit", e=>{
    e.preventDefault();
    let warning = '';
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    entrar = false;
    if (NameUser.value.length < 6) {
        entrar = true;
    }
    if(!validEmail.test(email.value)){
        entrar = true;
    }
    if(Password.value.length < 7){
        entrar = true
    }
    if(entrar){
        warning += 'Datos incorrectos'
        parrafo.innerHTML = warning
        document.getElementById("warning").style.display = 'block';
        
    } else {
        alert("Enviado");
        
    }

});
