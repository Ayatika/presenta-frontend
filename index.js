
const addButton = document.querySelector(".addButton");
const addButton2 = document.querySelector(".addButton2");
const getUsersDataButton = document.querySelector(".getUsersDataButton");
const logOutButton = document.querySelector(".logout");


const closeModal = document.querySelector(".closeModal");
const closeModal2 = document.querySelector(".closeModal2");
const closeModal3 = document.querySelector(".closeModal3");
 
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const modal3 = document.querySelector(".modal3");



const userName = document.querySelector("#name");
const password = document.querySelector("#password");
const price = document.querySelector("#price");

const userName2 = document.querySelector("#nameUpdate");
const password2 = document.querySelector("#passwordUpdate");
const price2 = document.querySelector("#priceUpdate");

const userIdChocie = document.querySelector("#selectInput");
const recordDate = document.querySelector("#recordDate");
const recordP = document.querySelector('#recordP');
const recordA = document.querySelector("#recordA");



const saveButton = document.querySelector(".modalBox");
const saveButton2 = document.querySelector(".modalBox2");
const updateButton = document.querySelector(".modalBox3");
const searchButton = document.querySelector(".searchButton");

const table = document.querySelector("#dataTable");
const table2 = document.querySelector("#usersTable");
const dateElement = document.querySelector(".date");


const year = document.querySelector("#year");
const month = document.querySelector("#month");


const search = document.querySelector(".search");




let idUpdate;
let record; 




const updateUserInofs=async()=>{
    let updatedData ={
        id:idUpdate,
        name:userName2.value,
        password:password2.value,
        price:price2.value,
    }

    try {
        const response = await axios.put(`http://localhost:3001/updateUser`,updatedData);
        getUsersInfos();
        getUsersRecords();
        modal3.style.display = "none";

    } catch (error) {
        console.log(error)
    }
}


const saveUser=async()=>{
    const userData = {
        name: userName.value,
        password: password.value,
        price: Number(price.value),
    }
    try {
        const response = await axios.post(`http://localhost:3001/saveUser`,userData).then(()=>{
            modal.style.display = "none";
            userName.value = "";
            password.value = "";
            price.value = "";

            getUsersRecords();
            getUsersInfos()
        });
        
    } catch (error) {
        console.log(error);
    }
}



const saveRecord=async()=>{

    const message = document.querySelector("#message");

    const data = {
        id: userIdChocie.value,
        date : recordDate.value,
        record:record,
    }
        try {
            const response = await axios.post("http://localhost:3001/saveData",data);
            message.style.display = "block";
            getUsersRecords();
            setTimeout(()=>{
                message.style.display = "none";
            },1100)
        } catch (error) {
            console.log(error)
        }

}


const checkdate=(day,date,item)=>{

    for (let i = 0; i < date?.length; i++) {

        if (Number(date[i].date.substring(8,10)) == Number(day) && month?.value == Number(date[i].date.substring(5,7)) && year?.value == Number(date[i].date.substring(0,4))) {
            if (date[i].record == "p") {
                return "<img class='presenceImage' src='./p.png'/>";
            }else{
                return "<img class='presenceImage' src='./a.png'/>";
            }
        }
    }

    return "";
}

const getUsersRecords=async(searchValue)=>{
    try {
            const response = await axios.get(`http://localhost:3001/getUsersRecords/${searchValue || "undefined"}`);
            const usersData = response.data;
        
        table.style.display = "block";


        const tabletr = table.querySelectorAll(".datatd");
        tabletr.forEach((item)=>{
            item.remove();
        })

        for(const item of usersData){
            const element = document.createElement("tr");
            element.className = "datatd"

            const date = item.dates;

            element.innerHTML = `
            <td>${item?.name}</td>
            <td>${checkdate(1,date,item)}</td>
            <td>${checkdate(2,date,item)}</td>
            <td>${checkdate(3,date,item)}</td>
            <td>${checkdate(4,date,item)}</td>
            <td>${checkdate(5,date,item)}</td>
            <td>${checkdate(6,date,item)}</td>
            <td>${checkdate(7,date,item)}</td>
            <td>${checkdate(8,date,item)}</td>
            <td>${checkdate(9,date,item)}</td>
            <td>${checkdate(10,date,item)}</td>
            <td>${checkdate(11,date,item)}</td>
            <td>${checkdate(12,date,item)}</td>
            <td>${checkdate(13,date,item)}</td>
            <td>${checkdate(14,date,item)}</td>
            <td>${checkdate(15,date,item)}</td>
            <td>${checkdate(16,date,item)}</td>
            <td>${checkdate(17,date,item)}</td>
            <td>${checkdate(18,date,item)}</td>
            <td>${checkdate(19,date,item)}</td>
            <td>${checkdate(20,date,item)}</td>
            <td>${checkdate(21,date,item)}</td>
            <td>${checkdate(22,date,item)}</td>
            <td>${checkdate(23,date,item)}</td>
            <td>${checkdate(24,date,item)}</td>
            <td>${checkdate(25,date,item)}</td>
            <td>${checkdate(26,date,item)}</td>
            <td>${checkdate(27,date,item)}</td>
            <td>${checkdate(28,date,item)}</td>
            <td>${checkdate(29,date,item)}</td>
            <td>${checkdate(30,date,item)}</td>
            <td>${checkdate(31,date,item)}</td>

            `;

            table.appendChild(element);
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser=async(item)=>{
    const id = item.id;
    try {
        const response =  await axios.delete(`http://localhost:3001/deleteUser/${id}`);
        getUsersInfos();
        getUsersRecords();

    } catch (error) {
        console.log(error)
    }
}

const getUsersInfos=async()=>{
    try {
        const response = await axios.get(`http://localhost:3001/getUsers`);
        const usersData = response.data;
        const tabletr = table2?.querySelectorAll(".datatd");

        tabletr?.forEach((item)=>{
            item.remove();
        });

        for(const item of usersData){
            const element = document.createElement("tr");
            element.className = "datatd";

            element.innerHTML = `
            <td>${item?.name}</td>
            <td>${item?.password}</td>
            <td>${item?.price} DH</td>
            <td><center><button id='modify'>Modify</button><button id='deleteButton'>Delete</button></center></td>
            `;
 
            table2?.appendChild(element);

            const modifyButton = element.querySelector("#modify");
            const deleteButton = element.querySelector("#deleteButton");


            modifyButton.addEventListener("click",()=>{
                modal3.style.display = "flex";
                userName2.value = item.name,
                password2.value = item.password,
                price2.value = item.price
                idUpdate = item.id;
            });

            deleteButton.addEventListener("click",()=>{
                deleteUser(item);
            });

        }

    } catch (error) {
        console.log(error)
    }
}


const getUsersNameSelect=async()=>{
    const selectInput = document.querySelector("#selectInput");

    try {
        const response = await axios.get("http://localhost:3001/getUsersName");
        selectInput.innerHTML = "<option value=''>------------------------------</option>";

        const usersName = response.data;
        for(const item of usersName){
        const element = document.createElement("option");
        element.innerText = item.name;
        element.value = item.id;
        selectInput.appendChild(element);
        }
        
        
    } catch (error) {
        console.log(error);
    }
}


const getDate=()=>{
    const date = new Date();

    let now = date.toISOString();
    dateElement.innerText = now.substring(0,10);
}




const checkAuth=()=>{
    const auth = localStorage.getItem("auth");
    
    if (!auth) {
        window.location.href = "./Login/login.html"
    }
};








addButton.addEventListener("click",()=>{
    modal.style.display = "flex";
});

closeModal.addEventListener("click",()=>{
    modal.style.display = "none";
});

addButton2.addEventListener("click",()=>{
    modal2.style.display = "flex";
    getUsersNameSelect();
});

closeModal2.addEventListener("click",()=>{
    modal2.style.display = "none";
});

closeModal3.addEventListener("click",()=>{
    modal3.style.display = "none";
});

saveButton.addEventListener("submit",(e)=>{
    e.preventDefault();
    saveUser();    
});

saveButton2.addEventListener("submit",(e)=>{
    e.preventDefault();
    saveRecord();    
});

updateButton.addEventListener("submit",(e)=>{
    e.preventDefault();
    updateUserInofs();    
});
getUsersDataButton.addEventListener("click",()=>{
    getUsersRecords();
})

logOutButton.addEventListener("click",()=>{
    localStorage.removeItem("auth");
    checkAuth();
})

search.addEventListener("input",()=>{
    console.log(search.value);
})

searchButton.addEventListener("click",()=>{
        getUsersRecords(search.value);
    
})

recordA.addEventListener('click',(e)=>{
    record = "a";
})

recordP.addEventListener('click',(e)=>{
    record = "p";
})

getUsersInfos();
getDate();
checkAuth();