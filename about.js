fetch('about.html')
.then(res=>res.text())
.then(data=>{
    document.getElementById("footer-container").innerHTML=data
})