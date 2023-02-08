// const db = jQuery.getJSON("http://127.0.0.1:3011/data/1");
var url = "http://10.100.203.78:3011/data/1";
var db;
/**
 * It fetches the data from the url, then it converts the response to json, then it assigns the data to
 * the variable datamqtt, and finally it catches any errors and logs them to the console.
 */
setInterval(rd, 1000);
var MQTT_CLIENT_ID =
  "iot_web_temp" +
  Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var reconnect = false;
// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client(
  "broker.hivemq.com",
  8000,
  MQTT_CLIENT_ID
);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });
// Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives

MQTT_CLIENT.onMessageArrived = myMessageArrived;
// set callback handlers
MQTT_CLIENT.onConnectionLost = onConnectionLost;

var mqtt_isconnected = false;

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
  MQTT_CLIENT.subscribe("SYNOPEXVINA2/IIOT/MQTT/TempHumi");
  mqtt_isconnected = true;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    // console.log("onConnectionLost:"+responseObject.errorMessage);
    mqtt_isconnected = false;
  }
}

//Khởi tạo các mảng cho data
var dataCuCl = [];
var datacheck = [];
var dataTime = [];
var data1;
var dataold;
var text;
var data;



var timedata = document.getElementById("timedata");
// This is the function which handles received messages
function myMessageArrived(message) {
  var text = JSON.parse(message.payloadString);
  data = text;
  console.log(data);
  db = data;
}
function rd() {
    const data = {
        datasets: [
            {
                label: 'SMT1', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "black", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT2', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "#58287F", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT3', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "#F5EDC", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT4', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "green", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'LAZER5', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#0078ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'LAZER6', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#00f6ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'COVERLAY7', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#ff00e0ff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'COVERLAY8', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#b800ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'EXPOSURE9', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#f40092ff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'EXPOSURE10', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#ceff6aff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau
                        // onRefresh: chart =>{
                        //     chart.data.datasets.forEach (dataset =>{
                        //         dataset.data.push({
                        //             x: Date.now(),
                        //             // y: 2   //thay data từ server vào => y
                        //         })
                        //     } )
                        // }
                    }
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    grid: {
                        // color : "black", //kẻ dóng hàng ngang

                    },
                }
            }
        }
    }
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    setInterval(function () {
        // Nhiệt độ
        //smt1
        data.datasets[0].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1]
        })
        //smt2
        data.datasets[1].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //smt3
        data.datasets[2].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //smt4
        data.datasets[3].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //lazer5
        data.datasets[4].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //lazer6
        data.datasets[5].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //Coerlay7 
        data.datasets[6].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.coverlay1)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //Coverlay8
        data.datasets[7].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.coverlay2)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //Exposure9
        data.datasets[8].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.exposure1)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });
        //Exposure10
        data.datasets[9].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.exposure2)[Object.values(db.nhiệt_độ.smt1).length - 1]
        });

        // Độ ẩm
        // smt1
        data1.datasets[0].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt1)[Object.values(db.độ_ẩm.smt1).length - 1]
        });
        //smt2
        data1.datasets[1].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt2)[Object.values(db.độ_ẩm.smt2).length - 1]
        });
        //smt3
        data1.datasets[2].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt3)[Object.values(db.độ_ẩm.smt3).length - 1]
        });
        //smt4
        data1.datasets[3].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt4)[Object.values(db.độ_ẩm.smt4).length - 1]
        });
        // lazer5
        data1.datasets[4].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.lazer1)[Object.values(db.độ_ẩm.lazer1).length - 1]
        });
        //lazer6
        data1.datasets[5].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.lazer2)[Object.values(db.độ_ẩm.lazer2).length - 1]
        });
        //Coerlay7 
        data1.datasets[6].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.coverlay1)[Object.values(db.độ_ẩm.coverlay1).length - 1]
        });
        //Coverlay8
        data1.datasets[7].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.coverlay2)[Object.values(db.độ_ẩm.coverlay2).length - 1]
        });
        //Exposure9
        data1.datasets[8].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.exposure1)[Object.values(db.độ_ẩm.exposure1).length - 1]
        });
        //Exposure10
        data1.datasets[9].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.exposure2)[Object.values(db.độ_ẩm.exposure2).length - 1]
        });
    }, 1);

    setInterval(read, 1);
    function read() {
        for (var i = 0; i < 10; i++) {
            document.getElementById(`temp${i + 1}`).textContent = config.data.datasets[i].data[config.data.datasets[i].data.length - 1].y.toFixed(1);
            document.getElementById(`hum${i + 1}`).textContent = config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y.toFixed(1);
        }

        if (Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1] > 26 || Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1] < 20) {
            document.getElementById(`fill1`).style.fill = "red";
        }
        else {
            document.getElementById(`fill1`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt2).length - 1] > 26 || Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt2).length - 1] < 20) {
            document.getElementById(`fill2`).style.fill = "red";
        }
        else {
            document.getElementById(`fill2`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt3).length - 1] > 26 || Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt3).length - 1] < 20) {
            document.getElementById(`fill3`).style.fill = "red";
        }
        else {
            document.getElementById(`fill3`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt4).length - 1] > 26 || Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt4).length - 1] < 20) {
            document.getElementById(`fill4`).style.fill = "red";
        }
        else {
            document.getElementById(`fill4`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.lazer1).length - 1] > 23 || Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.lazer1).length - 1] < 20) {
            document.getElementById(`fill5`).style.fill = "red";
        }
        else {
            document.getElementById(`fill5`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.lazer2).length - 1] > 23 || Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.lazer2).length - 1] < 20) {
            document.getElementById(`fill6`).style.fill = "red";
        }
        else {
            document.getElementById(`fill6`).style.fill = "black";
        }
        
        
        if (Object.values(db.nhiệt_độ.coverlay1)[Object.values(db.nhiệt_độ.coverlay1).length - 1] > 23 || Object.values(db.nhiệt_độ.coverlay1)[Object.values(db.nhiệt_độ.coverlay1).length - 1] < 20) {
            document.getElementById(`fill7`).style.fill = "red";
        }
        else {
            document.getElementById(`fill7`).style.fill = "black";
        }
        
        
        if (Object.values(db.nhiệt_độ.coverlay2)[Object.values(db.nhiệt_độ.coverlay2).length - 1] > 26 || Object.values(db.nhiệt_độ.coverlay2)[Object.values(db.nhiệt_độ.coverlay2).length - 1] < 20) {
            document.getElementById(`fill8`).style.fill = "red";
        }
        else {
            document.getElementById(`fill8`).style.fill = "black";
        }
        
        
        if (Object.values(db.nhiệt_độ.exposure1)[Object.values(db.nhiệt_độ.exposure1).length - 1] > 23 || Object.values(db.nhiệt_độ.exposure1)[Object.values(db.nhiệt_độ.exposure1).length - 1] < 20) {
            document.getElementById(`fill9`).style.fill = "red";
        }
        else {
            document.getElementById(`fill9`).style.fill = "black";
        }
        
        if (Object.values(db.nhiệt_độ.exposure2)[Object.values(db.nhiệt_độ.exposure2).length - 1] > 23 || Object.values(db.nhiệt_độ.exposure2)[Object.values(db.nhiệt_độ.exposure2).length - 1] < 20) {
            document.getElementById(`fill10`).style.fill = "red";
        }
        else {
            document.getElementById(`fill10`).style.fill = "black";
        }

        for(var i = 0; i < 10; i++){
            if(config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y < 40 || config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y > 60){
                document.getElementById(`humi${i + 1}`).style.fill = "red";
            } else {
                document.getElementById(`humi${i + 1}`).style.fill = "black";
            }
        }


        // Nhiệt độ
        var temp1 = document.getElementById("temp1").textContent;
        var temp2 = document.getElementById("temp2").textContent;
        var temp3 = document.getElementById("temp3").textContent;
        var temp4 = document.getElementById("temp4").textContent;
        var temp5 = document.getElementById("temp5").textContent;
        var temp6 = document.getElementById("temp6").textContent;
        var temp7 = document.getElementById("temp7").textContent;
        var temp8 = document.getElementById("temp8").textContent;
        var temp9 = document.getElementById("temp9").textContent;
        var temp10 = document.getElementById("temp10").textContent;

        // Độ ẩm
        var hum1 = document.getElementById("hum1").textContent;
        var hum2 = document.getElementById("hum2").textContent;
        var hum3 = document.getElementById("hum3").textContent;
        var hum4 = document.getElementById("hum4").textContent;
        var hum5 = document.getElementById("hum5").textContent;
        var hum6 = document.getElementById("hum6").textContent;
        var hum7 = document.getElementById("hum7").textContent;
        var hum8 = document.getElementById("hum8").textContent;
        var hum9 = document.getElementById("hum9").textContent;
        var hum10 = document.getElementById("hum10").textContent;

        // Nhiệt độ
        var smt = (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) + parseInt(temp4)) / 4;
        var lazer = (parseInt(temp5) + parseInt(temp6)) / 2;
        var coverlay = (parseInt(temp7) + parseInt(temp8)) / 2;
        var exposure = (parseInt(temp9) + parseInt(temp10)) / 2;

        // Độ ẩm
        var smt1 = (parseInt(hum1) + parseInt(hum2) + parseInt(hum3) + parseInt(hum4)) / 4;
        var lazer1 = (parseInt(hum5) + parseInt(hum6)) / 2;
        var coverlay1 = (parseInt(hum7) + parseInt(hum8)) / 2;
        var exposure1 = (parseInt(hum9) + parseInt(hum10)) / 2;
        var table = document.getElementById("sheet0");

        var dt = new Date();
        var month = dt.getMonth() + 1;
        var year = dt.getFullYear();
        var day = dt.getDate();
        var daysInMonth = new Date(year, month, 0).getDate();


        table.innerHTML =
            '<tr class="row2">' +
            '<td class="column1 style1 s" rowspan="1">PHÒNG</td>' +
            '<td class="column2 style2 s" colspan="2">SMT</td>' +
            '<td class="column4 style2 s" colspan="2">LAZER</td>' +
            '<td class="column6 style2 s" colspan="2">COVERLAY</td>' +
            '<td class="column8 style2 s" colspan="2">EXPOSURE</td>' +
            '</tr>' +
            '<tr class="row3">' +
            '<td class="column1 style1">Ngày</td>' +
            '<td class="column2 style3 s">Nhiệt độ</td>' +
            '<td class="column3 style3 s">Độ ẩm</td>' +
            '<td class="column4 style3 s">Nhiệt độ</td>' +
            '<td class="column5 style3 s">Độ ẩm</td>' +
            '<td class="column6 style3 s">Nhiệt độ</td>' +
            '<td class="column7 style3 s">Độ ẩm</td>' +
            ' <td class="column8 style3 s">Nhiệt độ</td>' +
            '<td class="column9 style3 s">Độ ẩm</td>' +
            '</tr>'

        for (var i = 1; i <= daysInMonth; i++) {
            if (i < day) {
                table.innerHTML +=
                    '<tr class="row5">' +
                    '<td class="column1 style4">' + i + '</td>' +
                    '<td class="column2 style5">' + ((db.nhiệt_độ.smt1[i] + db.nhiệt_độ.smt2[i] + db.nhiệt_độ.smt3[i] + db.nhiệt_độ.smt4[i]) / 4).toFixed(1) + '℃</td>' +
                    '<td class="column3 style4">' + ((db.độ_ẩm.smt1[i] + db.độ_ẩm.smt2[i] + db.độ_ẩm.smt3[i] + db.độ_ẩm.smt4[i]) / 4).toFixed(1) + '%</td>' +
                    '<td class="column4 style5">' + ((db.nhiệt_độ.lazer1[i] + db.nhiệt_độ.lazer2[i]) / 2).toFixed(1) + '℃</td>' +
                    '<td class="column5 style4">' + ((db.độ_ẩm.lazer1[i] + db.độ_ẩm.lazer2[i]) / 2).toFixed(1) + '%</td>' +
                    '<td class="column6 style5">' + ((db.nhiệt_độ.coverlay1[i] + db.nhiệt_độ.coverlay2[i]) / 2) .toFixed(1)+ '℃</td>' +
                    '<td class="column7 style4">' + ((db.độ_ẩm.coverlay1[i] + db.độ_ẩm.coverlay2[i]) / 2) .toFixed(1)+ '%</td>' +
                    '<td class="column8 style5">' + ((db.nhiệt_độ.exposure1[i] + db.nhiệt_độ.exposure2[i]) / 2).toFixed(1) + '℃</td>' +
                    '<td class="column9 style4">' + ((db.độ_ẩm.exposure1[i] + db.độ_ẩm.exposure2[i]) / 2).toFixed(1) + '%</td>' +
                    "</tr>";
            }
            else if (i == day) {
                table.innerHTML +=
                    '<tr class="row5">' +
                    '<td class="column1 style4">' + i + '</td>' +
                    '<td class="column2 style5">' + smt + '℃</td>' +
                    '<td class="column3 style4">' + smt1 + '%</td>' +
                    '<td class="column4 style5">' + lazer + '℃</td>' +
                    '<td class="column5 style4">' + lazer1 + '%</td>' +
                    '<td class="column6 style5">' + coverlay + '℃</td>' +
                    '<td class="column7 style4">' + coverlay1 + '%</td>' +
                    '<td class="column8 style5">' + exposure + '℃</td>' +
                    '<td class="column9 style4">' + exposure1 + '%</td>' +
                    "</tr>";
            }
            else {
                table.innerHTML +=
                    '<tr class="row5">' +
                    '<td class="column1 style4">' + i + '</td>' +
                    '<td class="column2 style5"></td>' +
                    '<td class="column3 style4"></td>' +
                    '<td class="column4 style5"></td>' +
                    '<td class="column5 style4"></td>' +
                    '<td class="column6 style5"></td>' +
                    '<td class="column7 style4"></td>' +
                    '<td class="column8 style5"></td>' +
                    '<td class="column9 style4"></td>' +
                    "</tr>"
            }

        }
    }

    // độ ẩm
    const data1 = {
        datasets: [
            {
                label: 'SMT1', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "black", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT2', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "#58287F", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT3', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "#F5EDC", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'SMT4', // tên line,
                borderWidth: 1, // độ dày
                borderColor: "green", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'LAZER5', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#0078ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'LAZER6', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#00f6ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'COVERLAY7', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#ff00e0ff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'COVERLAY8', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#b800ffff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'EXPOSURE9', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#f40092ff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
            {
                label: 'EXPOSURE10', // tên line
                borderWidth: 1, // độ dày
                borderColor: "#ceff6aff", // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white'
            },
        ]
    };

    const config1 = {
        type: 'line',
        data: data1,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau
                        // onRefresh: chart =>{
                        //     chart.data.datasets.forEach (dataset =>{
                        //         dataset.data.push({
                        //             x: Date.now(),
                        //             // y: 2   //thay data từ server vào => y
                        //         })
                        //     } )
                        // }
                    }
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                    grid: {
                        // color : "black", //kẻ dóng hàng ngang

                    },
                }
            }
        }
    }

    const myChart1 = new Chart(
        document.getElementById('myChart1'),
        config1
    )
}

