const logOutButton = document.querySelector(".logout");
const userName = document.querySelector("#name");
const wage = document.querySelector("#wageNumber");
const salaryNumber = document.querySelector("#salaryNumber");
const trContainer = document.querySelector(".trContainer");
let price = 0;
var uid = localStorage.getItem("authUser");

let fullTotal = 0; 

const checkAuth=()=>{
    auth = localStorage.getItem("authUser");
    if (!auth) {
        window.location.href = "/Login/login.html"
    }
}


logOutButton.addEventListener("click",()=>{
    localStorage.removeItem("authUser");
    checkAuth();
});


const getWorkerInfos=async()=>{
     const response = await axios.get(`http://localhost:3001/getWorkerInfos/${uid}`);
     const data = response.data;
     price = data.price;
     userName.innerText = data.name;
     wage.innerText = `${data.price} dh`;
}





const checkdate=(day,date,month,year,item)=>{

    for (let i = 0; i < date?.length; i++) {

        if (Number(date[i].date.substring(8,10)) == Number(day) && month == Number(date[i].date.substring(5,7)) && year == Number(date[i].date.substring(0,4))) {
            if (date[i].record == "p") {
                return "<img class='presenceImage' src='../p.png'/>";
            }else{
                return "<img class='presenceImage' src='../a.png'/>";
            }
        }
    }

    return "";
}


const getTotal=(item,year,month)=>{
    const date = item.dates;
    let total = 0;

    for (let i = 0; i < date.length; i++) { // Kidor 3la ga3 dates
            for (let j = 0; j < 31; j++) { // kidor 3la 31 jours
                if (Number(date[i].date.substring(8,10)) == Number(j+1) && month == Number(date[i].date.substring(5,7)) && year == Number(date[i].date.substring(0,4))) {
                    console.log(date[i].date)
                    if (date[i].record == "p") {
                        total += Number(price);
                    }
            }            
        }
        
    }

    fullTotal += Number(total);
    return total;
}




const getWorkerData=async()=>{
    const response = await axios.get(`http://localhost:3001/getWorkerData/${uid}`);
    const data = response.data;

    const date = data.dates;

    for (let i = 0; i < 12; i++) {
        const rows = document.createElement("tr");
        let month = i+1;
        let year = 2025;

        rows.innerHTML = `
            <td><center>${month}</center></td>
            <td>${checkdate(1,date,month,year,data)}</td>
            <td>${checkdate(2,date,month,year,data)}</td>
            <td>${checkdate(3,date,month,year,data)}</td>
            <td>${checkdate(4,date,month,year,data)}</td>
            <td>${checkdate(5,date,month,year,data)}</td>
            <td>${checkdate(6,date,month,year,data)}</td>
            <td>${checkdate(7,date,month,year,data)}</td>
            <td>${checkdate(8,date,month,year,data)}</td>
            <td>${checkdate(9,date,month,year,data)}</td>
            <td>${checkdate(10,date,month,year,data)}</td>
            <td>${checkdate(11,date,month,year,data)}</td>
            <td>${checkdate(12,date,month,year,data)}</td>
            <td>${checkdate(13,date,month,year,data)}</td>
            <td>${checkdate(14,date,month,year,data)}</td>
            <td>${checkdate(15,date,month,year,data)}</td>
            <td>${checkdate(16,date,month,year,data)}</td>
            <td>${checkdate(17,date,month,year,data)}</td>
            <td>${checkdate(18,date,month,year,data)}</td>
            <td>${checkdate(19,date,month,year,data)}</td>
            <td>${checkdate(20,date,month,year,data)}</td>
            <td>${checkdate(21,date,month,year,data)}</td>
            <td>${checkdate(22,date,month,year,data)}</td>
            <td>${checkdate(23,date,month,year,data)}</td>
            <td>${checkdate(24,date,month,year,data)}</td>
            <td>${checkdate(25,date,month,year,data)}</td>
            <td>${checkdate(26,date,month,year,data)}</td>
            <td>${checkdate(27,date,month,year,data)}</td>
            <td>${checkdate(28,date,month,year,data)}</td>
            <td>${checkdate(29,date,month,year,data)}</td>
            <td>${checkdate(30,date,month,year,data)}</td>
            <td>${checkdate(31,date,month,year,data)}</td>
            <td>${getTotal(data,year,month)}</td>

        `;
        trContainer.appendChild(rows)
    }
}

checkAuth()
getWorkerInfos().then(()=>{
    getWorkerData();
});

setTimeout(()=>{
    salaryNumber.innerText = Number(fullTotal) + " dh";
},600)