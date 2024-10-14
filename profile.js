// profile section
const profileLoad= ()=>{
    const token= localStorage.getItem("authToken")
    const profile= document.getElementById("profile-data")
    if(token){

        fetch("https://smart-rent.vercel.app/user/",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`,
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            profile.innerHTML=
        `
        <img class="profile-img mx-auto m-3" height="175px" width="175px" src="${data.profile_image}" alt="Profile image">
        <li class="list-group-item">Username: ${data.username} </li>
        <li class="list-group-item">First Name: ${data.first_name} </li>
        <li class="list-group-item">Last Name: ${data.last_name} </li>
        <li class="list-group-item">Email: ${data.email} </li>
        
        `
        })
    }
    else{
        window.location.href= "./login.html"
    }   
}
profileLoad()