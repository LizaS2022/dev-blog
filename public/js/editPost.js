const editPost = async (event) => {
    
    console.log(event);
    try {
    event.preventDefault();
    const title = event.srcElement[0].value;
    
    const description = event.srcElement[1].value;
    
    const id = event.submitter.dataset.id;
    console.log("tht edited id is:" + id)
    console.log(title)
    console.log(description)
    const response =  await fetch(`/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
           title,
           description,
        }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert("your post was edited successfully")
    }
}
catch (error) {
    alert("couldnt edit the post")
}
}



const editThisPost = document.getElementsByClassName('edit-post-form');
console.log(editThisPost);
for (let i = 0; i < editThisPost.length; i++) {
    editThisPost[i].addEventListener("submit", editPost)
}

const showEditBtn = document.getElementsByClassName("edit-btn");

for (let i = 0; i < showEditBtn.length; i++) {
    showEditBtn[i].addEventListener("click", function(){
        editThisPost[i].classList.toggle("display_edit");
    })
}


