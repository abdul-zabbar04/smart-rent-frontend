const UpdateProfile= async (event)=>{
    event.preventDefault();
    const form = document.getElementById('profile-update-form');
    const formData = new FormData(form);
    const token= localStorage.getItem("authToken")
    const profileImg= document.getElementById("profile_image").files[0]
    let profile_img='';
    let ProfileData= '';
    if(token){
        if(profileImg){
            const imgFormData = new FormData();
            imgFormData.append('image', profileImg)
            // console.log(imgFormData);
            const imgbbResponse = await
            fetch('https://api.imgbb.com/1/upload?key=6e856a08d1a2dc102e60c57e964312e5', {
            method: 'POST',
            body: imgFormData
            });
            // console.log(imgbbResponse, 'imgresponse');
            // console.log(imgbbResponse.url, 'imgresponse');
            const imgbbData = await imgbbResponse.json();
            if (imgbbData.status === 200) {
                profile_img = imgbbData.data.url;
                ProfileData = {
                    first_name: formData.get("first_name"),
                    last_name: formData.get("last_name"),
                    profile_image: profile_img
                    };
                } else {
                alert('Image upload failed!');
                return;
            }
        }
        else{
            ProfileData = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            };
        }
    
        // Fetch the API to update the profile using PATCH
        fetch('https://smart-rent.vercel.app/api/user/update/', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization : `Token ${token}`
            },
            body: JSON.stringify(ProfileData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, "this is my target data");
            document.getElementById('response-message').textContent = 'Profile updated successfully!';
        })
        .catch(error => {
            // console.error('Error:', error);
            document.getElementById('response-message').textContent = 'An error occurred while updating your profile.';
        });
    }
}

const editProfileLoad= ()=>{
    const token= localStorage.getItem("authToken")
    const profile= document.getElementById("profile-data")
    if(token){

        fetch("https://smart-rent.vercel.app/user/",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`,
            },
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.profile_image);
            document.getElementById('first_name').value = data.first_name;
            document.getElementById('last_name').value = data.last_name;
        })
    }
    else{
        window.location.href= "./login.html"
    }   
}
editProfileLoad()