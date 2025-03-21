const contactUs= async (event)=>{
    event.preventDefault()
    // console.log("contact us");
    const form= document.getElementById("contact-form")
    formData= new FormData(form)
    const postData={
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    }
    fetch("https://smart-rent.vercel.app/post/contact-us/",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(response=>{
        console.log(response);
        console.log(response.status);
        if(response.status===201){
            response.json().then(data=>{
                Toastify({
                    text: "Your message has been sent successfully!",
                    duration: 3000,
                    gravity: "top", 
                    position: "right",
                    style: {
                        background: "green",
                        width: "100%",
                    },
                }).showToast();
                form.reset()
            })
        }
        else{
            Toastify({
                text: "There was an issue sending your message.",
                duration: 3000,
                gravity: "top",
                position: "center", 
                style: {
                    background: "red",
                    width: "100%",
                },
            }).showToast();
        }
        
    })
    .catch(error=>{
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