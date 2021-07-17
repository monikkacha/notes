const noteListContainer = document.getElementById('noteList');
const xhttp = null;


function main() {
    loadData();
}

function loadData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost/projects/notes/php/api.php?action=LIST", true);
    xhr.onload = function() {
        if (this.status === 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.code == '1') {
                setNoteList(obj.data);
            } else {
                console.log("Something went wrong");
            }
        } else {
            console.log("Something went wrong");
        }
    }
    xhr.send();
}

function setNoteList(noteList) {
    var html = "";
    noteList.forEach(element => {
        var data = element.text;
        // html += "<div class=\"note-common\" id=\"id_" + id + "\">";
        html += "<div class=\"note-common\">";
        html += "<div class=\"note-x\" onClick=\"deleteNote(" + element.id + ")\">x</div>";
        html += "<div class=\"note-content\">";
        html += "<a href=\"https://localhost/projects/notes/php/addUpdate.php?id=" + element.id + "\">";
        html += data;
        html += "</a>";
        html += "</div>";
        html += "</div>";
    });
    noteListContainer.innerHTML += html;
}

function deleteNote(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost/projects/notes/php/api.php?action=DELETE_NOTE&id=" + id, true);
    xhr.onload = function() {
        if (this.status === 200) {
            var obj = JSON.parse(this.responseText);
            if (obj.code == '1') {
                location.reload();
            } else {
                console.log("Something went wrong");
            }
        } else {
            console.log("Something went wrong");
        }
    }
    xhr.send();
}

main();