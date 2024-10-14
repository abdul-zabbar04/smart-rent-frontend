const owner_ordered_posts= document.getElementById("owner-ordered-posts")
const loadOwnerOrderedPosts= ()=>{
    token= localStorage.getItem("authToken")
    if(token){
        fetch("https://smart-rent.vercel.app/owner/ordered_posts/",{
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
                document.getElementById("no-orders").style.display = "block";
                document.getElementById("order-table").style.display = "none";
            }
            data.forEach(element => {                
                owner_ordered_posts.innerHTML+=
                `
                <tr>
                <th scope="row"> ${element.id} </th>
                <th scope="row"> ${element.post} </th>
                <td>${element.post_title}</td>
                <td>${element.ordered_time}</td>
                <td>${element.status}</td>
                <td><a onclick="confirmOrder('${element.id}', '${element.post}')" class="btn btn-success btn-sm">Confirm</a></td>
              </tr>
                `
            });
        })
    }
    else{
        window.location.href= "./login.html";
    }

    
}
loadOwnerOrderedPosts()
