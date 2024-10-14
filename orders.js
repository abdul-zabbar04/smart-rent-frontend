const makeOrder= (event)=>{
    event.preventDefault()
    const parm= new URLSearchParams(window.location.search)
    const post_id= parm.get("id")
    // console.log(post_id);
    const token= localStorage.getItem("authToken")
    // console.log(token, "from makeOrders function");
    fetch(`https://smart-rent.vercel.app/order/${post_id}/`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${token}`
            
        },
        body: JSON.stringify(),
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
    })
}



