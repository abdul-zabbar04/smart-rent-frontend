const addPost= async (event)=>{
    event.preventDefault()
    const form= document.getElementById("add_post")
    const formData= new FormData(form)
    const token= localStorage.getItem("authToken")
    const imagefile= document.getElementById("image").files[0]
    imageUrl= '';
    if(token){

      if(imagefile){
        const imgFormData = new FormData();
        imgFormData.append('image', imagefile)
        console.log(imgFormData);
        const imgbbResponse = await
        fetch('https://api.imgbb.com/1/upload?key=6e856a08d1a2dc102e60c57e964312e5', {
        method: 'POST',
        body: imgFormData
      });
      console.log(imgbbResponse, 'imgresponse');
      console.log(imgbbResponse.url, 'imgresponse');
      const imgbbData = await imgbbResponse.json();
      console.log(imgbbData);
      if (imgbbData.status === 200) {
        imageUrl = imgbbData.data.url;
        } else {
        alert('Image upload failed!');
        return;
      }
    }
      const postData = {
        title: formData.get("title"),
        bedrooms: formData.get("bedrooms"),
        bathrooms: formData.get("bathrooms"),
        balcony: formData.get("balcony"),
        floor_number: formData.get("floor_number"),
        additional_information: formData.get("additional_info"),
        image: imagefile,
        category: formData.getAll("category"),
        available_from: formData.get("available_from"),
        rent: formData.get("rent"),
        district: formData.get("district"),
        area: formData.get("area"),
        image_url: imageUrl
        };
        // console.log(postData, "this is post data");
        fetch("https://smart-rent.vercel.app/post/list/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData)
        })
        .then((res) => res.json())
        .then((data) => {
        // alert("Post added successfully!");
        window.location.href = "./rent_advertisement.html";
        })
        .catch(error => console.error('Error:', error));
    }
    else{
      alert("Please Login to add Property")
    }
}
const postCard = document.getElementById("post-card");
const noContentMessage = document.getElementById("home-no-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const spinner = document.getElementById("spinner");
const paginationDisplay= document.getElementById("pagination-display");

let currentPage = 1;
let categoryWiseFilter = null;

const loadPost = (category, page = 1) => {
    let url;
    
    // For category filtering, if no category, use base URL, otherwise add category
    if (category) {
        url = `https://smart-rent.vercel.app/filter/category/${category}/`;
    } else {
        url = `https://smart-rent.vercel.app/post/list/`;
    }

    // Append the page parameter only if the page is not the first page (since it's implied in the API)
    if (page > 1) {
        url += `?page=${page}`;
    }

    // Show spinner
    if(spinner){
      spinner.style.display = "flex";
    }
    if(postCard){
      postCard.innerHTML = "";
    }
    if(noContentMessage){
      noContentMessage.innerText = "";
    }

    if(postCard){
      fetch(url)
      .then(res => res.json())
      .then(data => {
          // Log to ensure data is fetched
          console.log("Data received:", data);

          // Hide spinner after data is loaded
          if(spinner){
            spinner.style.display = "none";
          }
          paginationDisplay.style.display= "flex"

          // If no posts found, display message
          if (data.results.length === 0) {
            paginationDisplay.style.display= "none"
            noContentMessage.innerText = "No Contents";
              return;
          }
          


          // Render posts
          postCard.innerHTML = data.results.map(element => `
              <div class="card p-0 m-3 col-md-3 col-sm-12" style="width: 300px; height: 400px;">
                  <img src="${element.image_url}" class="card-img-top" alt="..." style="width: 300px; height: 200px;">
                  <div class="card-body">
                      <h6 class="text-center mt-2">${element.title.slice(0, 25)}</h6>
                      <h6 class="text-center">Bedrooms: ${element.bedrooms}, Bathrooms: ${element.bathrooms}</h6> 
                      <h6 class="text-center">To-let from: ${element.available_from}</h6>
                      <h6 class="text-center">Rent : ${element.rent} BDT </h6>
                      <h6 class="text-center">District: ${element.district.toUpperCase()} </h6>
                      <a href="./post_detail.html?id=${element.id}" class="btn btn-sm btn-primary w-75 mx-auto">Details</a>
                  </div>
              </div>
          `).join('');

          // Update pagination buttons
        if (prevBtn) {
          prevBtn.disabled = !(data.previous && data.previous.trim() !== "");
          
          if(prevBtn.disabled){
            prevBtn.style.color= "gray"
          }else{
            prevBtn.style.color=""
          }
          
        }
        if (nextBtn) {
            nextBtn.disabled = !(data.next && data.next.trim() !== "");
            if(nextBtn.disabled){
              nextBtn.style.color= "gray"
            }else{
              nextBtn.style.color=""
            }
        }
      })
      .catch(error => {
          // Log any error that occurred during the fetch
          console.error("Error fetching data:", error);
          if(spinner){
            spinner.style.display = "none";
          }
          if(noContentMessage){
            noContentMessage.innerText = "Error loading content, please try again later.";
          }
    });
    }
};

// Pagination event listeners
if(prevBtn){
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadPost(categoryWiseFilter, currentPage);
    }
});
}

if(nextBtn){
  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadPost(categoryWiseFilter, currentPage);
});
}

// Load first page
loadPost();


const getQueryParams= (param)=>{
    const urlparams= new URLSearchParams(window.location.search)
    // console.log(urlparams.get(param));
    return urlparams.get(param);
}

const postDetail= ()=>{
    const post_id= getQueryParams("id")
    // if(post_id){
      console.log(post_id);
      const details_container= document.getElementById("details-container")
      fetch(`https://smart-rent.vercel.app/post/list/${post_id}/`)
      .then(res=>res.json())
      .then(element=>{
          console.log(element);
          details_container.innerHTML=
          `
          <img src="${element.image_url} " alt="" class="img-fluid rounded details-img">
        <div class="details-text border border-5 rounded p-3">
          <ol class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Basic Information</div>
                <h6 class="text-left mt-2">Title: ${element.title}</h6>
                <h6 class="text-left">Bedrooms: ${element.bedrooms},&emsp; Bathrooms: ${element.bathrooms}</h6>
                <h6 class="text-left">Balcony: ${element.balcony},&emsp; Floor Number: ${element.floor_number}</h6>
                <h6 class="text-left">Additional Information: ${element.additional_information}</h6>
                <h6 class="text-left">Rent : ${element.rent} BDT </h6>              
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Location Information</div>
                <h6 class="text-left">District: ${element.district.toUpperCase()} </h6>
                <h6 class="text-left">Area: ${element.area} </h6>
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Available From</div>
                <h6 class="text-center">To-let from: ${element.available_from}</h6>
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <h6 class="text-left">Category: ${element.category}</h6>
                <h6 class="text-left">Owner Id: ${element.owner}</h6>
                <h6 class="text-left">Created On: ${element.on_created}</h6>
                <h6 class="text-left">Updated On: ${element.on_updated}</h6>
              </div>
            </li>
            <li class="list-group-item align-items-start">
              <div class="ms-2 me-auto">
              ${element.is_accepted 
                ? `<button disabled type="button" class="btn btn-success btn-sm m-2" >Already Rented</button>` 
                : `<button type="button" class="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#rentRequest">Rent Request</button>`
              }
                <a onclick="addFavorite()" class="btn btn-primary btn-sm m-2">Add to Favorite</a>
              </div>
            </li>
          </ol>
        </div>
          `
      })
    // }
}
postDetail()

// Add comment start here
const addComment= (event)=>{
  event.preventDefault()
  // console.log("this is add comment function");
  const comment_form= document.getElementById("add_comment")
  const commentFormData= new FormData(comment_form)
  const commentData= {
    rating: commentFormData.get("rating"),
    body: commentFormData.get("comment"),
  }
  console.log(commentData);
  const token= localStorage.getItem("authToken")
  // console.log(token);
  post_id= getQueryParams("id")
  if(token){
    // console.log(post_id);
    fetch(`https://smart-rent.vercel.app/post/review/${post_id}/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(commentData),
    })
    .then(response=>{
      if(response.status===201){
        Toastify({
          text: "Comment added successfully!",
          duration: 3000,
          gravity: "top", 
          position: "center",
          style: {
              background: "green",
              width: "100%",
          },
      }).showToast();
      setTimeout(function() {
        location.reload()
    }, 3000);
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
  else{
    alert("You are not login user")
  }
}

//  Each post comments load here

const loadComments= ()=>{
  const comments_container= document.getElementById("each-comment")
  const post_id= getQueryParams("id")
  if(post_id){
    fetch(`https://smart-rent.vercel.app/post/reviews/${post_id}/`)
  .then(res=>res.json())
  .then(data=>{
    const total_comment= document.getElementById("no-of-comments")
    total_comment.innerText= data.length
    data.forEach(comment=>{
      console.log(comment);
      comments_container.innerHTML+=
      `
      <h6 class="mt-5">${comment.user_full_name}</h6>
      <small> ${comment.created_on} </small>
      <div class="p-2">
        <small>${comment.rating} out of 5★ <br></small>
        ${comment.body}
      </div>
      `
    })
  })
  }
  
}
loadComments()