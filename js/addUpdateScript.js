const textArea = document.getElementById('text');

main();

function main() {
    setGreetingAndBg();
}

function setGreetingAndBg() {
    let today = new Date();
    let hours = today.getHours();
    if (hours < 12) {
        document.body.style.backgroundImage = "url('https://localhost/projects/notes/images/morning.jpg')";
    } else if (hours < 16) {
        document.body.style.backgroundImage = "url('https://localhost/projects/notes/images/afternoon.jpg')";
    } else if (hours < 20) {
        document.body.style.backgroundImage = "url('https://localhost/projects/notes/images/evening.jpg')";
    } else if (hours < 24) {
        document.body.style.backgroundImage = "url('https://localhost/projects/notes/images/night.jpg')";
    }
}

function updateNote(id) {
    var text = textArea.value;
    console.log("text", text);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost/projects/notes/php/api.php?action=UPDATE_NOTE&id=" + id + "&text=" + text, true);
    xhr.onload = function() {
        if (this.status === 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.code == '1') {
                console.log("Update SuccessFul");
                redirect();
            } else {
                console.log("Something went wrong");
            }
        } else {
            console.log("Something went wrong");
        }
    }
    xhr.send();
}

function addNote() {
    var text = textArea.value;
    console.log("text", text);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost/projects/notes/php/api.php?action=INSERT_NOTE&text=" + text, true);
    xhr.onload = function() {
        if (this.status === 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.code == '1') {
                console.log("Added SuccessFul");
                redirect();
            } else {
                console.log("Something went wrong");
            }
        } else {
            console.log("Something went wrong");
        }
    }
    xhr.send();
}

function redirect() {
    window.location = "http://localhost/projects/notes/";
}