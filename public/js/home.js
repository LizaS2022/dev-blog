


// function displayBlogs() {

   const postBlog = async (event) => {
       event.preventDefault();
       console.log("im in the e.preventDefault")
       const titleValue = document.getElementById("post-name").value;
       console.log(titleValue);
       const descriptionValue = document.getElementById("post-desc").value;
       const dateCreated = document.getElementById("post-created").value;
    //    const reply = event.target.
    
       
        if (titleValue && descriptionValue) {
       const postValue = await fetch('/dashboard', {
           method: 'POST',
           body:JSON.stringify({
               title: titleValue,
               description: descriptionValue,
               date_created: dateCreated,
               user_id: req.session.user
           }),
           headers: { 'content-type': 'application/json' },
       });
       if(postValue.ok) {
           alert('You post is displayed!')
           location.href="/";
       }

       else if(postValue.status === 401) {
        location.href="/login";
       }
       else {
           console.log(postValue)
           alert('something went wrong')
   }
}};




