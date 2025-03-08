const categoryFilter = () => {
    const categories_container = document.getElementById("categories-items");

    fetch("https://smart-rent.vercel.app/filter/categories/")
    .then(res => res.json())
    .then(data => {
        data.results.forEach(element => {
            
            categories_container.innerHTML += `
                <div class="card m-2 category-card" id="${element.slug}" onclick="loadPost('${element.slug}'); highlightCategory('${element.slug}')">
                    <img src="${element.icon}" class="card-img-top" alt="${element.name}" style="height: 150px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h6 class="card-title">${element.name}</h6>
                    </div>
                </div>
            `;
        });
    });
};

// Function to highlight the selected category
const highlightCategory = (slug) => {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('border-primary', 'shadow-lg');
    });

    document.getElementById(slug).classList.add('border-primary', 'shadow-lg');
};

categoryFilter();
