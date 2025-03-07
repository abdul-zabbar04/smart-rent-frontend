const rent_requests_card= document.getElementById("all-rent-requests")
function formatTime(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}
const loadRentRequests= ()=>{
    token= localStorage.getItem("authToken")
    if(token){
        fetch("https://smart-rent.vercel.app/user/orders/",{
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
                document.getElementById("no-results-requests").style.display = "block";
            }
            data.forEach(element => {                
                rent_requests_card.innerHTML+=
                `
                <tr>
                <th scope="row"> ${element.id} </th>
                <td>${element.post_title}</td>
                <td>${element.status}</td>
                <td><a href=${element.post_detail_link} class="btn btn-success btn-sm">Go</a></td>
                <td>${element.ordered_time.split('T')[0]}</td> 
                <td>${formatTime(element.ordered_time)}</td>
              </tr>
                `
                
            });
        })
    }
    else{
        window.location.href= "./login.html";
    }

    
}
loadRentRequests()