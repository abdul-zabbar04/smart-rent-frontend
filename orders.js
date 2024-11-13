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
    .then(response=>{
        if(response.status===201){
            Toastify({
                text: "Rent request submitted! Please wait for the owner's response.",
                duration: 3000,
                gravity: "top", 
                position: "right",
                style: {
                    background: "green",
                    width: "100%",
                },
            }).showToast();
            setTimeout(function() {
                location.reload();
            }, 3000);
        }
    })
    .catch(error=>{
        console.log(error);
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



