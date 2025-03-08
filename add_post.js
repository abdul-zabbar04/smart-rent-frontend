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

const loadPost = (category=null, page = 1, district= null) => {
    let url;
    
    // For category filtering, if no category, use base URL, otherwise add category
    if (category) {
        searchedData= document.getElementById("searchInput").value= "";
        url = `https://smart-rent.vercel.app/filter/category/${category}/`;
    } else if(district){
      url = `https://smart-rent.vercel.app/filter/district/${district}/`;

    }else {
        searchedData= document.getElementById("searchInput").value= "";
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
            <div class="card p-0 m-2 col-md-3 col-sm-12" style="width: 214px; height: 350px;">
            <img src="${element.image_url}" class="card-img-top" alt="Property Image" style="width: 100%; height: 180px; object-fit: cover;">
            <div class="card-body text-center" style="height: 170px;">
                <h6 class="mt-2">${element.title.slice(0, 25)}</h6>
                <h6 class="text-primary">Rent: ${element.rent} BDT</h6>
                <a href="./post_detail.html?id=${element.id}" class="btn btn-sm btn-primary mt-2 w-75">View Details</a>
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

const postDetail = () => {
  const post_id = getQueryParams("id");
  const details_container = document.getElementById("details-container");

  fetch(`https://smart-rent.vercel.app/post/list/${post_id}/`)
  .then(res => res.json())
  .then(element => {
      details_container.innerHTML = `
      <div class="container">
    <!-- Image Row -->
    <div class="row mb-4">
        <div class="col-12 d-flex justify-content-center">
            <img src="${element.image_url}" alt="Property Image" class="img-fluid rounded" style="max-height: 400px; object-fit: cover;">
        </div>
    </div>

    <!-- Information Row -->
    <div class="row">
        <!-- Left Column (Basic Information and Rent) -->
        <div class="col-md-6">
            <!-- Basic Information Section -->
            <div class="section mb-4">
                <h3 class="text-primary">Basic Information</h3>
                <p><strong>Title:</strong> ${element.title}</p>
                <p><strong>Bedrooms:</strong> ${element.bedrooms}, <strong>Bathrooms:</strong> ${element.bathrooms}</p>
                <p><strong>Balcony:</strong> ${element.balcony}, <strong>Floor Number:</strong> ${element.floor_number}</p>
                <p><strong>Additional Information:</strong> ${element.additional_information}</p>
                <p><strong>Rent:</strong> ${element.rent} BDT</p>
            </div>

            <!-- Available From Section -->
            <div class="section mb-4">
                <h3 class="text-primary">Available From</h3>
                <p><strong>To-let from:</strong> ${element.available_from}</p>
            </div>
        </div>

        <!-- Right Column (Location, Other Information) -->
        <div class="col-md-6">
            <!-- Location Information Section -->
            <div class="section mb-4">
                <h3 class="text-primary">Location Information</h3>
                <p><strong>District:</strong> ${element.district.toUpperCase()}</p>
                <p><strong>Area:</strong> ${element.area}</p>
            </div>

            <!-- Other Information Section -->
            <div class="section mb-4">
                <h3 class="text-primary">Other Information</h3>
                <p><strong>Category:</strong> ${element.category}</p>
                <p><strong>Owner Id:</strong> ${element.owner}</p>
                <p><strong>Created On:</strong> ${element.on_created}</p>
                <p><strong>Updated On:</strong> ${element.on_updated}</p>
            </div>
        </div>
    </div>

    <!-- Action Buttons -->
    <div class="row">
        <div class="col-12">
            <div class="section mb-4">
                ${element.is_accepted 
                    ? `<button disabled type="button" class="btn btn-success btn-sm m-2">Already Rented</button>` 
                    : `<button type="button" class="btn btn-primary btn-sm m-2" data-bs-toggle="modal" data-bs-target="#rentRequest">Rent Request</button>`
                }
                <a onclick="addFavorite()" class="btn btn-outline-primary btn-sm m-2">Add to Favorite</a>
            </div>
        </div>
    </div>
</div>

      `;
  });
}

postDetail();

// Add comment functionality
const addComment = (event) => {
  event.preventDefault();
  const comment_form = document.getElementById("add_comment");
  const commentFormData = new FormData(comment_form);
  const commentData = {
      rating: commentFormData.get("rating"),
      body: commentFormData.get("comment"),
  };
  const token = localStorage.getItem("authToken");
  const post_id = getQueryParams("id");

  if (token) {
      fetch(`https://smart-rent.vercel.app/post/review/${post_id}/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
          },
          body: JSON.stringify(commentData),
      })
      .then(response => {
          if (response.status === 201) {
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
                  location.reload();
              }, 3000);
          }
      })
      .catch(error => {
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
      });
  } else {
      alert("You are not logged in.");
  }
}

// Load comments functionality
const loadComments = () => {
  const comments_container = document.getElementById("each-comment");
  const post_id = getQueryParams("id");

  if (post_id) {
      fetch(`https://smart-rent.vercel.app/post/reviews/${post_id}/`)
      .then(res => res.json())
      .then(data => {
          const total_comment = document.getElementById("no-of-comments");
          total_comment.innerText = data.length;
          data.forEach(comment => {
              comments_container.innerHTML += `
                  <div class="comment">
                      <h6 class="mt-4">${comment.user_full_name}</h6>
                      <small> ${comment.created_on} </small>
                      <div class="p-2">
                          <small>${comment.rating} out of 5★</small>
                          <p>${comment.body}</p>
                      </div>
                  </div>
              `;
          });
      });
  }
}

loadComments();
