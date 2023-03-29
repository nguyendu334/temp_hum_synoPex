// const db = jQuery.getJSON("http://127.0.0.1:3011/data/1");
var url = 'http://10.100.203.78:3011/data/1';
var db;
/**
 * It fetches the data from the url, then it converts the response to json, then it assigns the data to
 * the variable datamqtt, and finally it catches any errors and logs them to the console.
 */
setInterval(rd, 1000);
var MQTT_CLIENT_ID = 'iot_web_temp' + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var reconnect = false;
// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client('broker.hivemq.com', 8000, MQTT_CLIENT_ID);

// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });
// Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives

MQTT_CLIENT.onMessageArrived = myMessageArrived;
// set callback handlers
MQTT_CLIENT.onConnectionLost = onConnectionLost;

var mqtt_isconnected = false;

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
    MQTT_CLIENT.subscribe('SYNOPEXVINA2/IIOT/MQTT/TempHumi');
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

var timedata = document.getElementById('timedata');
// This is the function which handles received messages
function myMessageArrived(message) {
    var text = JSON.parse(message.payloadString);
    data = text;
    //   console.log(data);
    db = data;
}
function rd() {
    const data = {
        datasets: [
            {
                label: 'SMT1', // tên line,
                borderWidth: 1, // độ dày
                borderColor: 'black', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT2', // tên line,
                borderWidth: 1, // độ dày
                borderColor: '#58287F', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT3', // tên line,
                borderWidth: 1, // độ dày
                borderColor: '#F5EDC', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT4', // tên line,
                borderWidth: 1, // độ dày
                borderColor: 'green', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'LAZER5', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#0078ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'LAZER6', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#00f6ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'COVERLAY7', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#ff00e0ff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'COVERLAY8', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#b800ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'EXPOSURE9', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#f40092ff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'EXPOSURE10', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#ceff6aff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'IT1', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#0000FF', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'IT2', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#800000', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
        ],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true, //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau 1s
                    },
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                },
            },
        },
    };
    new Chart(document.getElementById('myChart'), config);

    setInterval(function () {
        // Nhiệt độ
        //smt1
        data.datasets[0].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1],
        });
        //smt2
        data.datasets[1].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt2).length - 1],
        });
        //smt3
        data.datasets[2].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt3).length - 1],
        });
        //smt4
        data.datasets[3].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt4).length - 1],
        });
        //lazer5
        data.datasets[4].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.lazer1).length - 1],
        });
        //lazer6
        data.datasets[5].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.lazer2).length - 1],
        });
        //Coerlay7
        data.datasets[6].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.coverlay1)[
                Object.values(db.nhiệt_độ.coverlay1).length - 1
            ],
        });
        //Coverlay8
        data.datasets[7].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.coverlay2)[
                Object.values(db.nhiệt_độ.coverlay2).length - 1
            ],
        });
        //Exposure9
        data.datasets[8].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.exposure1)[
                Object.values(db.nhiệt_độ.exposure1).length - 1
            ],
        });
        //Exposure10
        data.datasets[9].data.push({
            x: Date.now(),
            y: Object.values(db.nhiệt_độ.exposure2)[
                Object.values(db.nhiệt_độ.exposure2).length - 1
            ],
        });

        //IT
        // data.datasets[10].data.push({
        //     x: Date.now(),
        //     y: Object.values(db.nhiệt_độ.it1)[Object.values(db.nhiệt_độ.it1).length - 1]
        // });
        // //IT
        // data.datasets[11].data.push({
        //     x: Date.now(),
        //     y: Object.values(db.nhiệt_độ.it2)[Object.values(db.nhiệt_độ.it2).length - 1]
        // });

        // Độ ẩm
        // smt1
        data1.datasets[0].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt1)[Object.values(db.độ_ẩm.smt1).length - 1],
        });
        //smt2
        data1.datasets[1].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt2)[Object.values(db.độ_ẩm.smt2).length - 1],
        });
        //smt3
        data1.datasets[2].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt3)[Object.values(db.độ_ẩm.smt3).length - 1],
        });
        //smt4
        data1.datasets[3].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.smt4)[Object.values(db.độ_ẩm.smt4).length - 1],
        });
        // lazer5
        data1.datasets[4].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.lazer1)[Object.values(db.độ_ẩm.lazer1).length - 1],
        });
        //lazer6
        data1.datasets[5].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.lazer2)[Object.values(db.độ_ẩm.lazer2).length - 1],
        });
        //Coerlay7
        data1.datasets[6].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.coverlay1)[Object.values(db.độ_ẩm.coverlay1).length - 1],
        });
        //Coverlay8
        data1.datasets[7].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.coverlay2)[Object.values(db.độ_ẩm.coverlay2).length - 1],
        });
        //Exposure9
        data1.datasets[8].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.exposure1)[Object.values(db.độ_ẩm.exposure1).length - 1],
        });
        //Exposure10
        data1.datasets[9].data.push({
            x: Date.now(),
            y: Object.values(db.độ_ẩm.exposure2)[Object.values(db.độ_ẩm.exposure2).length - 1],
        });

        //IT1
        // data1.datasets[10].data.push({
        //     x: Date.now(),
        //     y: Object.values(db.độ_ẩm.it1)[Object.values(db.độ_ẩm.it1).length - 1]
        // });
        // //it2
        // data1.datasets[11].data.push({
        //     x: Date.now(),
        //     y: Object.values(db.độ_ẩm.it2)[Object.values(db.độ_ẩm.it2).length - 1]
        // });
    }, 1000);

    setInterval(read, 1);
    function read() {
        for (var i = 0; i < 10; i++) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`temp${i + 1}`).textContent =
                config.data.datasets[i].data[config.data.datasets[i].data.length - 1].y.toFixed(1);
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`hum${i + 1}`).textContent =
                config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y.toFixed(
                    1,
                );
        }

        if (
            Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1] > 26 ||
            Object.values(db.nhiệt_độ.smt1)[Object.values(db.nhiệt_độ.smt1).length - 1] < 20
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill1`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill1`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt2).length - 1] > 26 ||
            Object.values(db.nhiệt_độ.smt2)[Object.values(db.nhiệt_độ.smt2).length - 1] < 20
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill2`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill2`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt3).length - 1] > 26 ||
            Object.values(db.nhiệt_độ.smt3)[Object.values(db.nhiệt_độ.smt3).length - 1] < 20
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill3`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill3`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt4).length - 1] > 26 ||
            Object.values(db.nhiệt_độ.smt4)[Object.values(db.nhiệt_độ.smt4).length - 1] < 20
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill4`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill4`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.lazer1).length - 1] > 23 ||
            Object.values(db.nhiệt_độ.lazer1)[Object.values(db.nhiệt_độ.lazer1).length - 1] < 17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill5`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill5`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.lazer2).length - 1] > 23 ||
            Object.values(db.nhiệt_độ.lazer2)[Object.values(db.nhiệt_độ.lazer2).length - 1] < 17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill6`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill6`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.coverlay1)[Object.values(db.nhiệt_độ.coverlay1).length - 1] >
                23 ||
            Object.values(db.nhiệt_độ.coverlay1)[Object.values(db.nhiệt_độ.coverlay1).length - 1] <
                17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill7`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill7`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.coverlay2)[Object.values(db.nhiệt_độ.coverlay2).length - 1] >
                26 ||
            Object.values(db.nhiệt_độ.coverlay2)[Object.values(db.nhiệt_độ.coverlay2).length - 1] <
                17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill8`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill8`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.exposure1)[Object.values(db.nhiệt_độ.exposure1).length - 1] >
                23 ||
            Object.values(db.nhiệt_độ.exposure1)[Object.values(db.nhiệt_độ.exposure1).length - 1] <
                17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill9`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill9`).style.fill = 'black';
        }

        if (
            Object.values(db.nhiệt_độ.exposure2)[Object.values(db.nhiệt_độ.exposure2).length - 1] >
                23 ||
            Object.values(db.nhiệt_độ.exposure2)[Object.values(db.nhiệt_độ.exposure2).length - 1] <
                17
        ) {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill10`).style.fill = 'red';
        } else {
            document
                .getElementById('left-wapper')
                .getSVGDocument()
                .getElementById(`fill10`).style.fill = 'black';
        }

        // it
        // if (Object.values(db.nhiệt_độ.it1)[Object.values(db.nhiệt_độ.it1).length - 1] > 23 || Object.values(db.nhiệt_độ.it1)[Object.values(db.nhiệt_độ.it1).length - 1] < 17) {
        //     document.getElementById("left-wapper").getSVGDocument().getElementById(`fill10`).style.fill = "red";
        // }
        // else {
        //     document.getElementById("left-wapper").getSVGDocument().getElementById(`fill10`).style.fill = "black";
        // }
        // if (Object.values(db.nhiệt_độ.it2)[Object.values(db.nhiệt_độ.it2).length - 1] > 23 || Object.values(db.nhiệt_độ.it2)[Object.values(db.nhiệt_độ.it2).length - 1] < 17) {
        //     document.getElementById("left-wapper").getSVGDocument().getElementById(`fill10`).style.fill = "red";
        // }
        // else {
        //     document.getElementById("left-wapper").getSVGDocument().getElementById(`fill10`).style.fill = "black";
        // }

        for (var i = 0; i < 12; i++) {
            if (
                config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y < 40 ||
                config1.data.datasets[i].data[config1.data.datasets[i].data.length - 1].y > 60
            ) {
                document
                    .getElementById('left-wapper')
                    .getSVGDocument()
                    .getElementById(`humi${i + 1}`).style.fill = 'red';
            } else {
                document
                    .getElementById('left-wapper')
                    .getSVGDocument()
                    .getElementById(`humi${i + 1}`).style.fill = 'black';
            }
        }
    }

    // độ ẩm
    const data1 = {
        datasets: [
            {
                label: 'SMT1', // tên line,
                borderWidth: 1, // độ dày
                borderColor: 'black', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT2', // tên line,
                borderWidth: 1, // độ dày
                borderColor: '#58287F', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT3', // tên line,
                borderWidth: 1, // độ dày
                borderColor: '#F5EDC', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'SMT4', // tên line,
                borderWidth: 1, // độ dày
                borderColor: 'green', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.2, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'LAZER5', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#0078ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'LAZER6', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#00f6ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'COVERLAY7', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#ff00e0ff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'COVERLAY8', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#b800ffff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'EXPOSURE9', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#f40092ff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'EXPOSURE10', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#ceff6aff', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'IT1', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#0000FF', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
            {
                label: 'IT2', // tên line
                borderWidth: 1, // độ dày
                borderColor: '#800000', // màu line
                pointRadius: 0, // điển chấm data trên line
                tension: 0.5, //độ uốn của line
                backgroundColor: 'white',
            },
        ],
    };

    const config1 = {
        type: 'line',
        data: data1,
        options: {
            scales: {
                x: {
                    type: 'realtime',
                    grid: {
                        display: true, //kẻ dóng hàng dọc
                    },
                    realtime: {
                        duration: 1 * 60 * 1000, //hiển thị 2 phut data
                        delay: 1000, // lùi data hiển thị về sau 1s
                    },
                },
                y: {
                    beginAtZero: true,
                    type: 'linear',
                },
            },
        },
    };

    new Chart(document.getElementById('myChart1'), config1);
}
