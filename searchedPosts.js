const searchPosts= (event)=>{
    event.preventDefault()
    var searchedData= document.getElementById("searchInput").value
    const district= searchedData.toLowerCase()
    console.log(district);
    const container= document.getElementById("post-card").innerHTML=""
    console.log(container);
    loadPost(null, 1, district)
    
}