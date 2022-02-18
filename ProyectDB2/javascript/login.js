const Api_Login = 'https://webapidavidtest1.azurewebsites.net/api/person'


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
