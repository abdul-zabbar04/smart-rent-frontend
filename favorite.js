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
        .then(response=>{
            if(response.status===201){
                Toastify({
                    text: "Successfully added to favorites.",
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                        background: "green",
                        width: "100%",
                    },
                }).showToast();
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
    else{
        Toastify({
            text: "Only logged-in users can add posts to favorites!",
            duration: 4000,
            gravity: "top", 
            position: "right",
            style: {
                background: "red",
                width: "100%",
            },
        }).showToast();
    }
}
