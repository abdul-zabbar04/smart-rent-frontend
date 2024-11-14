const confirmOrder=(order_id, post_id)=>{
    // console.log(order_id, post_id);
    token= localStorage.getItem("authToken")
    console.log(token);
    if(token){
        fetch(`https://smart-rent.vercel.app/confirm/post/${post_id}/order/${order_id}/`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Token ${token}`
                
            },
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            // console.log(data.success);
            // console.log(data.error);
            const confirm_message= document.getElementById("confirm-order")
            
            if(data.success){
                confirm_message.style.color= "green";
                confirm_message.innerText= data.success
            }
            else{
                confirm_message.style.color= "red";
                confirm_message.innerText= data.error
            }
            
        })
        .catch(err=>{
            console.log(err)
            confirm_message.style.color= "red";
            confirm_message.innerText= "Internet Connection Failed!"
        })
    }
    
}