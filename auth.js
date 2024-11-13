const handleRegister= (event) =>{
    event.preventDefault();
    const form= document.getElementById("registraion-form")
    const form_data= new FormData(form)
    const registraionData={
        username: form_data.get('username'),
        email: form_data.get('email'),
        password: form_data.get('password'),
        confirm_password: form_data.get('confirm_password'),
    };
    fetch("https://smart-rent.vercel.app/api/register/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registraionData),
    })
    .then(response=>{
        const register_res=document.getElementById("register-res")
        register_res.innerText="";
        if(response.status==201){
            form.reset()
            register_res.style.color="green"
            register_res.innerText= "Registration successful! Please check your email."
        }
        else{
            response.json().then(data=>{
                if(data.username){
                    register_res.style.color="red";
                    register_res.innerText+= data.username+"\n"
                }
                if(data.email){
                    register_res.style.color="red";
                    register_res.innerText+= data.email+"\n"
                }
                if(data.error){
                    register_res.style.color="red";
                    register_res.innerText+= data.error+"\n"
                }
            })
        }
        
    })
    .catch(error=>{
        Toastify({
            text: "Network error. Please try again later.",
            duration: 3000,
            gravity: "top",
            position: "center", 
            style: {
                background: "red",
                width: "100%",
            },
        }).showToast();
    })
}

const handleLogin= (event) =>{
    event.preventDefault();
    const form= document.getElementById("login-form")
    const form_data= new FormData(form)
    const loginData= {
        username: form_data.get("username"),
        password: form_data.get("password")
    }
    fetch("https://smart-rent.vercel.app/account/api-auth/login/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.token){
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href= "./index.html"
        }
        else{
            document.getElementById("login-error").innerText="Login Failed! Not Found."
            // console.log("invalid password or username");
        }
    })
    .catch(error=>{
        Toastify({
            text: "Network error. Please try again later.",
            duration: 3000,
            gravity: "top",
            position: "center", 
            style: {
                background: "red",
                width: "100%",
            },
        }).showToast();
    });
}

const handleLogout= ()=>{
    // console.log('hello');
    const token= localStorage.getItem("authToken")
    // console.log(token, "from logout handle");
    fetch("https://smart-rent.vercel.app/account/api-auth/logout/",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${token}`,
        },
    })
    .then(res=>{
        if(res.ok){
            localStorage.removeItem("authToken");
            localStorage.removeItem("user_id");
            window.location.href= "./login.html";
        }
    })
    .catch(err=>console.log(err))
}

const changePassword= (event)=>{
    event.preventDefault();
    const form = document.getElementById('change-password-form');
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const token= localStorage.getItem("authToken")
    if(token){

        fetch('https://smart-rent.vercel.app/account/api/change-password/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const responseMessage = document.getElementById('response-message');
            responseMessage.textContent = '';
            if (data.message) {
                responseMessage.textContent = data.message;
                responseMessage.style.color = 'green';
            }  else {
                if (data.old_password) {
                    responseMessage.textContent = data.old_password[0];
                } else if (data.confirm_new_password) {
                    responseMessage.textContent = data.confirm_new_password[0];
                } else {
                    responseMessage.textContent = 'An error occurred. Please try again.';
                }
    
                responseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            // console.error('Error:', error);
            document.getElementById('response-message').textContent = 'An error occurred.';
        });
    }
}