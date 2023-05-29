const replyMessage = async (event) => {
    try {
    event.preventDefault();
    const comment_text = event.srcElement[0].value;
    const post_id = event.target.getAttribute("data-post-id");
    console.log("the comment text is:"+ comment_text);
    console.log("the post id is:" + post_id);
    
    const response =  await fetch(`/comments/save`, {
        method: 'POST',
        body: JSON.stringify({
            comment_text,
            post_id,
        }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        alert("a comment was posted successfully")
    }

    else if (response.status=== 401) {
        location.href ="/login";
    }
}
    
catch (error) {
    alert("couldnt comment on the post")
}
}


const commentThisPost = document.getElementsByClassName('reply-form');
console.log(commentThisPost);
for (let i = 0; i < commentThisPost.length; i++) {
    commentThisPost[i].addEventListener("submit", replyMessage)
}

const displyReplyBox = document.getElementsByClassName("show-reply-box");
const displayComment = document.getElementsByClassName("comment-displayed")

for (let i = 0; i < displyReplyBox.length; i++) {
    displyReplyBox[i].addEventListener("click", function(){
        commentThisPost[i].classList.toggle("display_box");
        displyReplyBox[i].classList.toggle("display_none");
        console.log("display reply box" + displyReplyBox);
    })
}