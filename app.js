setInterval(() => {
    timer();
}, 1000)

// var connect = document.getElementById("connect");
// var hmi = document.getElementById("hmi");
// const read = () => {
//     jQuery.getJSON("./demo.json", (data) => {
//         if (data != null) {
//             connect.classList.remove("green");
//             hmi.classList.remove("green");
//         }
//     });
// }

sigmqtt = 0;
const timer = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var day = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    document.getElementById("myTime").innerHTML =
        h + ":" + m + ":" + s + "      " + day + "/" + month + "/" + year;
    var connect = document.getElementById("connect");
    sigmqtt++;
    timedata.value = new Date()
}

// set font-size and font-family
for (var i = 0; i < 10; i++) {
    document.getElementById(`temp${i + 1}`).style.fontFamily = "myDigitalFont";
    document.getElementById(`temp${i + 1}`).style.fontSize = "6px";
    document.getElementById(`temp${i + 1}`).style.strokeWidth = "0.7";
    document.getElementById(`hum${i + 1}`).style.fontFamily = "myDigitalFont";
    document.getElementById(`hum${i + 1}`).style.fontSize = "6px";
    document.getElementById(`hum${i + 1}`).style.strokeWidth = "0.7";
    document.getElementById(`hum${i + 1}`).style.fill = "yellow";
}

