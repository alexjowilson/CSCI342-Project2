var droparea;

function GetDropArea() {
    console.log("hello world!");
    droparea = document.getElementById("droparea");
}

function Highlight(e) {
    e.preventDefault();
    droparea.className = 'droparea highlight';
    return false;
}

function Unhighlight(e) {
    e.preventDefault();
    droparea.className = 'droparea unhighlight';
    return false;
}

function Take (e) {
    e.preventDefault();
    droparea.className = 'droparea';
    return false;
}

