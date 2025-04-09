const userName = document.querySelector("#userName");
const password = document.querySelector("#password");

const loginButton = document.querySelector(".loginBox");
const errorMessage = document.querySelector("#errorMessage");



const myCred = { 
    name:"mohssine",
    password: "147852369"
}

const login=async()=>{
    if (userName.value.toLowerCase() === myCred.name && password.value === myCred.password) {
        localStorage.setItem("auth",true);
        window.location.href = "/index.html";
    }else{
        try {
            const response = await axios.post("http://localhost:3001/login",{userName:userName.value,password:password.value});
            localStorage.setItem("authUser",response.data);
            window.location.href = "/Worker/worker.html";
 
        } catch (error) {
            errorMessage.style.display = "block";
            console.log(error);
        }
    }
}



loginButton.addEventListener("submit",(e)=>{
    e.preventDefault();
    login();
})




const checkAuth=()=>{
    const auth = localStorage.getItem("auth");
    const auth2 = localStorage.getItem("authUser");


    if (auth){
        window.location.href = "/index.html";
    }else if(auth2){
        window.location.href = "/Worker/worker.html";
    }
}

checkAuth();