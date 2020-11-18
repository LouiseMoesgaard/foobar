"use script";

let data;
let dataStream;


initDataStream();

function initDataStream(){
    fetchData();
    dataStream = setInterval(() => {
        fetchData();
    }, 10000);

}
function fetchData(){
    fetch("https://kea-alt-del.dk/kata-distortion/")
    .then(res => res.json())
    .then(newData => data = newData)
    .then(()=> inQueue());
}

function inQueue(){
    document.querySelector("#number span").innerHTML = data.inQueue;
    document.querySelector(".walking_lane").innerHTML = "";

    for (i = 0; i < data.inQueue; i++) {

        let person = document.createElement("div");
        person.classList.add("person");

        person.style.left = "-" + (75 * i) + "px";
        
        document.querySelector(".walking_lane").append(person); 
    }   
    walkLeft();
}

function walkLeft(){
    document.querySelectorAll(".person").forEach(person => {
        let position = parseInt(person.style.left);

        person.classList.add("walking");

        let walkingTimer = setInterval(() => {
            position = position + 5;
            person.style.left = position + "px"; 
        }, 10);

        setTimeout(()=>{
            clearInterval(walkingTimer);
        }, 20000)
    });
}
