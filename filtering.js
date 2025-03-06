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
const District_load = ()=>{
    fetch("https://smart-rent.vercel.app/filter/districts/")
    .then(res=>res.json())
    .then(data=>{
        displayDistrict(data.results);
    })
    .catch(err=>console.log(err))
}
const displayDistrict= (district)=>{
    const district_container= document.getElementById("district")
    district.forEach(element => {
        district_container.innerHTML+=`
            <option value=${element.slug}>${element.name}</option>
        `        
    });
}
District_load()
//  district section end


