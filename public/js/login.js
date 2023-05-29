
const userForm = document.getElementById("userForm");


const formSubmission = async (event) => {
    event.preventDefault();

    const userValue = document.getElementById("userNameInput").value;
    console.log(userValue);
    const passwordValue = document.getElementById("passwordInput").value;
    console.log(passwordValue);


    if (userValue && passwordValue) {
    const postValue = await fetch('/' + document.getElementById("title").innerText.toLowerCase(), {
        method: 'POST',
        body:JSON.stringify({
            username: userValue,
            password: passwordValue,
        }),
        headers: { 'content-type': 'application/json' },
    });


    if(postValue.ok) {
        alert('You signed up successfully')
        location.href="/dashboard";
    }
    

    else {
        alert('something went wrong');

}
}};

console.log(userForm);

userForm.addEventListener("submit", formSubmission);


const title2El = document.getElementById("title2");

const switchTitle = async (e) => {
    e.preventDefault();

    const titleEl = document.getElementById("title");
    const title2El = document.getElementById("title2");
    const submitEl = document.getElementById("submitBtn");

    if (titleEl.innerText === "Login") {
        titleEl.innerText = "Sign-Up";
        title2El.innerText = "Login Instead";
        submitEl.innerText = "Sign-Up";
    }

    else if (titleEl.innerText === "Sign-Up") {
        titleEl.innerText = "Login";
        title2El.innerText = "Sign-Up Instead";
        submitEl.innerText = "Login";
    }
    
  else {
    titleEl.innerText = "Login";
    title2El.innerText = "Sign-Up Instead";
    submitEl.innerText = "Login";
  }

}

title2El.addEventListener("click", switchTitle);