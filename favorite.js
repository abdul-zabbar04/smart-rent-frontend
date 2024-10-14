const addFavorite= ()=>{
    token= localStorage.getItem("authToken")
    console.log(token);
    const parm= new URLSearchParams(window.location.search)
    const post_id= parm.get("id")
    // console.log(post_id);

    if(token){
        fetch(`https://smart-rent.vercel.app/favorite/${post_id}/`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : `Token ${token}`
                
            },
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>console.log(err))
    }
}
