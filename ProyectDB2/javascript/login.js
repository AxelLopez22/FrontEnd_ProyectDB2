//const Api_Login = 'https://webapidavidtest1.azurewebsites.net/api/person'


const d = document,
    $form = d.querySelector(".FormUser");


const $formulario = d.getElementById("fromRegister");

$formulario.addEventListener("submit", async e => {
        e.preventDefault();
        const User = document.getElementById('NameUser').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('Pass').value;
        console.log("Esto sirve");
        try {
            let NewUser = {
                method: "POST",
                headers:{
                    "Content-type":"application/json; charset=utf-8"
                },
                body:JSON.stringify({
                    NameUser:User,
                    Email:email,
                    Password:password,
                })
            },
            res = await fetch(`http://localhost:5555/Persona`,NewUser);
            json = await res.json();
            document.getElementById("warning").style.display = 'block';

            if(!res.ok) throw {status:res.status,statusText:res.statusText}
            location.reload();
        } catch (err) {
            let message = err.statusText || "Ocurrio un error"
            $formulario.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}: ${message}</b></p>`)
        }
});

/**
const Log_User = () => {
    const UserName = document.getElementById('NameUser').value;
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('Pass').value;

    console.log(UserName);
    console.log(Email);
    console.log(Password);

    const user = {
        UniqIduserweb: '',
        StrEmail: Email,
        StrFirtname: '',
        StrLastname: '',
        StrUser: UserName,
        VbiPicture: '',
        VbiPassword: Password,
        DtDateregister: '',
        BitStatusverification: '',
        BitStatus:''
    }

    fetch(Api_Login,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error', error))
    .then(Response => console.log('Success', Response));
}
 */