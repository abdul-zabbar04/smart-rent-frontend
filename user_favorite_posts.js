const user_favorite_posts= document.getElementById("user-favorite-posts")
function formatTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
const loadUserFavoritePosts= ()=>{
    token= localStorage.getItem("authToken")
    if(token){
        fetch("https://smart-rent.vercel.app/user/favorite/posts",{
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            // console.log(data.length);
            if(data.length===0){
                document.getElementById("no-results-favorite-posts").style.display = "block";
            }
            data.forEach(element => {                
                user_favorite_posts.innerHTML+=
                `
                <tr>
                <th scope="row"> ${element.id} </th>
                <td>${element.post_title}</td>
                <td><a href=${element.post_url} class="btn btn-success btn-sm">Go</a></td>
                <td>${element.create_on.split('T')[0]}</td> 
                <td>${formatTime(element.create_on)}</td>
              </tr>
                `
            });
        })
    }
    else{
        window.location.href= "./login.html";
    }

    
}
loadUserFavoritePosts()