console.log("hello world!");

const userForm = document.getElementById("userForm");

const formSubmission = async (e) => {
    e.preventDefault();

    const userValue = document.getElementById("userNameInput").value;
    console.log(userValue);
    const emailValue = document.getElementById("emailInput").value;
    console.log(emailValue);
    const passwordValue = document.getElementById("passwordInput").value;
    console.log(passwordValue);

    const postValue = await fetch('/users/signup', {
        method: 'POST',
        body:JSON.stringify({
            username: userValue,
            email:emailValue,
            password: passwordValue,
        }),
        headers: { 'content-type': 'application/json' },
    })
    if(postValue.ok) {
        alert('You signed up successfully');
}
else {
    alert('something went wrong');
}



userForm.addEventListener("submit", formSubmission);