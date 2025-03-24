const addPost = async (event) => {
  event.preventDefault()
  const form = document.getElementById("add_post")
  const formData = new FormData(form)
  const token = localStorage.getItem("authToken")
  const imagefile = document.getElementById("image").files[0]
  imageUrl = '';
  if (token) {

    if (imagefile) {
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
  else {
    alert("Please Login to add Property")
  }
}
const postCard = document.getElementById("post-card");
const noContentMessage = document.getElementById("home-no-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const spinner = document.getElementById("spinner");
const paginationDisplay = document.getElementById("pagination-display");

let currentPage = 1;
let categoryWiseFilter = null;

const loadPost = (category = null, page = 1, district = null) => {
  let url;
  const sorting = document.getElementById("sortSelect").value
  // For category filtering, if no category, use base URL, otherwise add category
  if (category) {
    searchedData = document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value=""
    url = `https://smart-rent.vercel.app/filter/category/${category}/`;
  } else if (district) {
    document.getElementById("sortSelect").value=""
    url = `https://smart-rent.vercel.app/filter/district/${district}/`;

  } else {
    searchedData = document.getElementById("searchInput").value = "";
    url = `https://smart-rent.vercel.app/post/list/`;
  }


  // Append the page parameter only if the page is not the first page (since it's implied in the API)
  if (sorting) {
    // Always add the ordering parameter first
    url += `?ordering=${sorting}`;
  }

  if (page > 1) {
    // If page is greater than 1, add the page parameter
    if (sorting) {
      // If ordering is already added, append with & 
      url += `&page=${page}`;
    } else {
      // If ordering is not added, use ? to start query string
      url += `?page=${page}`;
    }
  }
  // Show spinner
  if (spinner) {
    spinner.style.display = "flex";
  }
  if (postCard) {
    postCard.innerHTML = "";
  }
  if (noContentMessage) {
    noContentMessage.innerText = "";
  }

  if (postCard) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Log to ensure data is fetched
        console.log("Data received:", data);

        // Hide spinner after data is loaded
        if (spinner) {
          spinner.style.display = "none";
        }
        paginationDisplay.style.display = "flex"

        // If no posts found, display message
        if (data.results.length === 0) {
          paginationDisplay.style.display = "none"
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
                <h6 class="text-primary">District: ${element.district}</h6>
                <a href="./post_detail.html?id=${element.id}" class="btn btn-sm btn-primary mt-2 w-75">View Details</a>
            </div>
          </div>

          `).join('');

        // Update pagination buttons
        if (prevBtn) {
          prevBtn.disabled = !(data.previous && data.previous.trim() !== "");

          if (prevBtn.disabled) {
            prevBtn.style.color = "gray"
          } else {
            prevBtn.style.color = ""
          }

        }
        if (nextBtn) {
          nextBtn.disabled = !(data.next && data.next.trim() !== "");
          if (nextBtn.disabled) {
            nextBtn.style.color = "gray"
          } else {
            nextBtn.style.color = ""
          }
        }
      })
      .catch(error => {
        // Log any error that occurred during the fetch
        console.error("Error fetching data:", error);
        if (spinner) {
          spinner.style.display = "none";
        }
        if (noContentMessage) {
          noContentMessage.innerText = "Error loading content, please try again later.";
        }
      });
  }
};

// Pagination event listeners
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      loadPost(categoryWiseFilter, currentPage);
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadPost(categoryWiseFilter, currentPage);
  });
}

// Load first page
loadPost();


const getQueryParams = (param) => {
  const urlparams = new URLSearchParams(window.location.search)
  // console.log(urlparams.get(param));
  return urlparams.get(param);
}


