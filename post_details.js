const getQueryParams1 = (param) => {
    const urlparams = new URLSearchParams(window.location.search)
    // console.log(urlparams.get(param));
    return urlparams.get(param);
    }
const postDetail = () => {
    const post_id = getQueryParams1("id");
    const details_container = document.getElementById("details-container");
    if(post_id){
        fetch(`https://smart-rent.vercel.app/post/list/${post_id}/`)
      .then(res => res.json())
      .then(element => {
        console.log(element);
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
            setTimeout(function () {
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
    const post_id = getQueryParams1("id");
  
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

