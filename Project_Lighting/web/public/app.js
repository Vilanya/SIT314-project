// const students = JSON.parse(localStorage.getItem('students')) || [];
//var currentStudent = [localStorage.getItem('fname'),localStorage.getItem('lname'),localStorage.getItem('c_name'),localStorage.getItem('tutor')];

const API_URL = `http://localhost:5000/api`;

const MQTT_URL = `http://localhost:5001/send-command`;

const currentUser = localStorage.getItem('user');

var sensordata = [];

if (currentUser) {
    $.get(`${API_URL}/data`)
        .then(response => {
            response.forEach((sensordata) => {
                //console.log("'#devices tbody'");
                moisture = sensordata;
                timestamp = Date.now().toLocaleString;

            });
        })
        .catch(error => { 
            console.error(`Error: ${error}`);
        }); 

    
        

// async function renderChart() {
//   await chart.render(document.getElementById("chart"));
//   //chart.setRefreshInterval(interval: 60);
  
// }

// renderChart().catch((e) => window.alert(e.message));
}
else {
    const path = window.location.pathname;

    //users should login before tgey can see other pages
    if (path !== '/login' && path !== '/registration') {
        location.href = '/login';
    }
}

$('#send-command').on('click', function() { 
    const command = "on"; 
    console.log(`command is: ${command}`);
    //const deviceId = $('#deviceId').val(); 
    $.post(MQTT_URL, {command}) 
    location.href = '/chart';

});

$('#register').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val(); 
    const confirm = $('#confirm').val();
    if (password != confirm){
        $('#message').append(`<p class="alert alert-danger">'Passwords do not match'</p>`); 
    } else {
        $.post(`${API_URL}/registration`, { user, password }) 
        .then((response) => {
            if (response.success) {
                location.href = '/login';
            } else {
                $('#message').append(`<p class="alert alert-danger">${response}</p>`); 
            }
        });
    }
});

$('#login').on('click', () => {
    const user = $('#username').val();
    const password = $('#password').val(); 
    $.post(`${API_URL}/authenticate`, { user, password }) 
    .then((response) =>{
        console.log("response");
        console.log(response);
        if (response.success) {
            localStorage.setItem('user', user); 
            localStorage.setItem('isAdmin', response.isAdmin); 
            localStorage.setItem('isAuthenticated',true);
            location.href = '/homepage';
        } else {
            $('#message').append(`<p class="alert alert-danger">${response}</p>`); 
        }
    }); 
});

const logout = () => { 
    localStorage.removeItem('user'); 
    location.href = '/login';
}