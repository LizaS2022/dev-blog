


function displayBlogs() {

   const postBlog = async (event) => {
       event.preventDefault();
       console.log("im in the e.preventDefault")
       const titleValue = document.getElementById("post-name").value;
       console.log(titleValue);
       const descriptionValue = document.getElementById("post-desc").value;
       const dateCreated = document.getElementById("post-created").value;
       
       
        if (titleValue && descriptionValue) {
           console.log("I am in the if statment of the post")
       const postValue = await fetch('/dashboard', {
           method: 'POST',
           body:JSON.stringify({
               title: titleValue,
               description: descriptionValue,
               date_created: dateCreated,
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

}}};

displayBlogs()