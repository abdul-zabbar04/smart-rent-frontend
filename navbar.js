fetch('navbar.html')
.then(res=>res.text())
.then(data=>{
    const navbar= document.getElementById("navbar")
    navbar.classList.add("fixed-top");
    navbar.innerHTML=data

    // assign login logout signup, profile page link

    const navbar_auth= document.getElementById("navbar-auth")
    const addProperty= document.getElementById("add-property")
    
    const token= localStorage.getItem("authToken")
    if(token){
        navbar_auth.innerHTML=
        `
        <a href="./profile.html" class="btn btn-sm btn-outline-light mx-1">Profile</a>    
        <a onclick=handleLogout() class="btn btn-sm btn-outline-light mx-1 text-white">Logout</a>
        `
        addProperty.innerHTML= `
        <a class="nav-link text-white" href="./add_post.html">Add Property</a>
        `
        
    }
    else{
        navbar_auth.innerHTML=
        `
        <a href="./login.html" class="btn btn-sm btn-outline-light mx-1">Login</a>
        <a href="./registration.html" class="btn btn-sm btn-outline-light mx-1">Sign up</a>
        `
        
        
    }

})

