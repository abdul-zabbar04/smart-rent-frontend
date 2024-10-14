fetch('navbar.html')
.then(res=>res.text())
.then(data=>{
    document.getElementById("navbar").innerHTML=data

    // assign login logout signup, profile page link

    const navbar_auth= document.getElementById("navbar-auth")
    
    const token= localStorage.getItem("authToken")
    if(token){
        navbar_auth.innerHTML=
        `
        <a href="./profile.html" class="btn btn-secondary">Profile</a>    
        <a onclick=handleLogout() class="btn btn-secondary text-white">Logout</a>
        `
        
    }
    else{
        navbar_auth.innerHTML=
        `
        <a href="./login.html" class="btn btn-secondary">Login</a>
        <a href="./registration.html" class="btn btn-secondary">Sign up</a>
        `
        
        
    }

})

