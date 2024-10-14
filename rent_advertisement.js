const rent_card= document.getElementById("rent-card")
const loadRent= ()=>{
    token= localStorage.getItem("authToken")
    if(token){
        fetch("https://smart-rent.vercel.app/owner/posts/",{
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
                document.getElementById("no-results-post").style.display = "block";
            }
            data.forEach(element => {                
                if(element.is_published){
                    rent_card.innerHTML+=
                    `
                        <div class="card p-0 m-3 col-md-3 col-sm-12" style="width: 300px; height: 400px;">
                        <img src=${element.image_url}  class="card-img-top" alt="..." style="width: 300px; height: 200px; >
                        <div class="card-body">
                        <h6 class="text-center mt-2">${element.title.slice(0,25)}</h6>
                        <h6 class="text-center">Bedrooms: ${element.bedrooms}, Bathrooms: ${element.bathrooms}</h6> 
                        <h6 class="text-center">To-let from: ${element.available_from}</h6>
                        <h6 class="text-center">Rent : ${element.rent} BDT </h6>
                        <h6 class="text-center">District: ${element.district.toUpperCase()} </h6>
                        <h6 class="text-center text-success">Status : Published </h6>                  
                        </div>
                        </div>
                    `
                }
                else{
                    rent_card.innerHTML+=
                `
                    <div class="card p-0 m-3 col-md-3 col-sm-12" style="width: 300px; height: 400px;">
                    <img src=${element.image_url}  class="card-img-top" alt="..." style="width: 300px; height: 200px; >
                    <div class="card-body">
                    <h6 class="text-center mt-2">${element.title.slice(0,25)}</h6>
                    <h6 class="text-center">Bedrooms: ${element.bedrooms}, Bathrooms: ${element.bathrooms}</h6> 
                    <h6 class="text-center">To-let from: ${element.available_from}</h6>
                    <h6 class="text-center">Rent : ${element.rent} BDT </h6>
                    <h6 class="text-center">District: ${element.district.toUpperCase()} </h6>
                    <h6 class="text-center text-danger">Status : Pending </h6>                  
                    </div>
                    </div>
                `
                }
                
            });
        })
    }
    else{
        window.location.href= "./login.html";
    }

    
}
loadRent()