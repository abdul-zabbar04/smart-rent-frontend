// category section start
const Categories_load = ()=>{
    fetch("https://smart-rent.vercel.app/filter/categories/")
    .then(res=>res.json())
    .then(data=>{
        displayData(data.results);
        const filter_category= document.getElementById("categories-items")
    })
    .catch(err=>console.log(err))
}

const displayData= (categories)=>{
    const cate_select= document.getElementById("categories")
    categories.forEach(element => {
        cate_select.innerHTML+=`
            <option value=${element.slug}>${element.name}</option>
        `
    });
    
}
Categories_load()
// category section end

// district section start
let currentPageUrl = "https://smart-rent.vercel.app/filter/districts/"; // First request to get the initial page
let nextPageUrl = null;
let prevPageUrl = null;

const districtDropdown = document.getElementById("district");
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

const fetchDistricts = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Clear previous options
        districtDropdown.innerHTML = "";

        // Add district options
        data.results.forEach(district => {
            const option = document.createElement("option");
            option.value = district.slug;
            option.textContent = district.name;
            districtDropdown.appendChild(option);
        });

        // Update next and previous page URLs
        nextPageUrl = data.next; // DRF provides next page URL or null
        prevPageUrl = data.previous; // DRF provides previous page URL or null

        // Enable/Disable buttons based on pagination
        prevButton.disabled = !prevPageUrl;
        nextButton.disabled = !nextPageUrl;
    } catch (error) {
        console.error("Error fetching districts:", error);
    }
};

// Event listeners for pagination
prevButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    if (prevPageUrl) fetchDistricts(prevPageUrl);
});

nextButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    if (nextPageUrl) fetchDistricts(nextPageUrl);
});


// Initial load
fetchDistricts(currentPageUrl);

//  district section end


