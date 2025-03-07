const owner_ordered_posts= document.getElementById("owner-ordered-posts")
function formatTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
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
                <td>${element.ordered_time.split('T')[0]}</td> 
                <td>${formatTime(element.ordered_time)}</td>
                <td>${element.status}</td>
                <td>
                <a onclick="confirmOrder('${element.id}', '${element.post}')" class="btn btn-sm ${element.status === 'Pending' ? 'btn-success' : 'btn-secondary'}">
                    ${element.status === 'Pending' ? 'Confirm' : 'Confirmed'}
                </a>
                </td>
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
