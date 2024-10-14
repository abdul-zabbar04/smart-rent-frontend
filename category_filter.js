const categoryFilter= ()=>{
    const categories_container= document.getElementById("categories-items")
    fetch("https://smart-rent.vercel.app/filter/categories/")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(element => {
            categories_container.innerHTML+=`
            <button id="${element.slug}" onclick="loadPost('${element.slug}');highlightCategory('${element.slug}')" class="m-3 btn btn-outline-info">${element.name}</button>
            `
        });
        // console.log(categories_container);
    })
}
const highlightCategory = (slug) => {
    // Remove 'active' class from all buttons
    document.querySelectorAll('#categories-items button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add 'active' class to the clicked button
    document.getElementById(slug).classList.add('active');
};

categoryFilter();

