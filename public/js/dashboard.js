
const postBlogBtn = document.getElementById("addPost");

    const postBlog = async (event) => {
        event.preventDefault();
        const titleValue = document.getElementById("post-name").value;
        const descriptionValue = document.getElementById("post-desc").value;
       
        
        
        if (titleValue && descriptionValue) {
        const postValue = await fetch("/dashboard", {
            method: 'POST',
            body:JSON.stringify({
                title: titleValue,
                description: descriptionValue,
            }),
            headers: { 'content-type': 'application/json' },
        });
        if(postValue.ok) {
            alert('You post is displayed!')
            
        }
        else {
            alert('something went wrong')
    }
}};


document.getElementById("new_post").addEventListener("submit", postBlog);


document.addEventListener("DOMContentLoaded", (event) => {
    const titleBlogs = document.getElementsByClassName("title_blog");
    const descBlogs = document.getElementsByClassName("desc_blog");

for (let i = 0; i < titleBlogs.length; i++) {
    titleBlogs[i].addEventListener("click", function(event){
        event.preventDefault();
        descBlogs[i].classList.toggle("display_none");
    });
}
});


const deletePost = async (event) => {
    
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/dashboard/${id}`, {
            method: 'DELETE',
        });
        if( response.ok) {
            alert('You post is deleted!')
            
        }
        else {
            console.log(response)
            alert('something went wrong');
    }
    }
}


const deleteThisPost = document.getElementsByClassName("delete-btn");

for (let i = 0; i < deleteThisPost.length; i++) {
    deleteThisPost[i].addEventListener("click",deletePost); 
}




