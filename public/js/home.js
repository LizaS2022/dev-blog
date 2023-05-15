


const postBlogBtn = document.getElementById("addPost");
 const userForm = document.getElementById("new-post-form");
console.log(userForm);


    const postBlog = async (event) => {
        event.preventDefault();
        console.log("im in the e.preventDefault")
        const titleValue = document.getElementById("post-name").value;
        console.log(titleValue);
        const descriptionValue = document.getElementById("post-desc").value;
        console.log(descriptionValue);

        console.log("this is the session id");
        console.log(session.user_id);

        if (titleValue && descriptionValue) {
            console.log("I am in the if statment of the post")
        const postValue = await fetch('/home', {
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
            console.log(postValue)
            alert('something went wrong')
    }

}};

postBlogBtn.addEventListener("click", postBlog);

   