$("#admin-login").submit((e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username === "" || password === "") {
    console.log("enter details");
  } else {
    $.ajax({
      url: "login",
      type: "post",
      data: {
        username,
        password,
      },
      success: (response) => {
        console.log(response);
        if (response.user === false) {
          alert("user not found");
        } else if (response.password === false) {
          alert("incorrect password");
        } else if (response.login === true) {
          window.location.href = "home";
        }
      },
    });
  }
});

$("#add-keyword-form").submit((e) => {
  e.preventDefault();
  $.ajax({
    url: "upload-keyword",
    type: "post",
    data: new FormData(document.getElementById("add-keyword-form")),
    processData: false,
    contentType: false,
    success: (response) => {
      if (response === true) {
        console.log(response);
        $("#uploadmsg").html("added succes").css("color", "green").show();
        $("#uploadmsg").delay(1000).hide(0);
        $("#add-keyword-form").load(location.href + " #add-keyword-form");
      } else {
        $("#uploadmsg")
          .html("file format not support")
          .css("color", "red")
          .show();
        $("#uploadmsg").delay(1000).hide(0);
        $("#add-keyword-form").load(location.href + " #add-keyword-form");
      }
    },
  });

  // return false;
});

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

var count = 0;
let test = false;
function onDrop(event) {
  console.log(event.target.className);

  if (
    event.target.className === "accordion-button collapsed" ||
    event.target.className === "accordion-button"
  ) {
    event.preventDefault();
    console.log("yess");
  } else if (event.target.className === "fas fa-plus-circle add-a") {
    const id = event.dataTransfer.getData("text");
    let second = document.getElementById(id + "b").value.replace(/\"/g, "");
    let parrentId = event.target.parentNode.id;
    let inputId = parrentId.slice(0, -1);
    let first = event.target.parentElement.value.replace(/\"/g, "");
    let newKeyword = first + " " + second;
    console.log(newKeyword);

    let html =
      '<input style="display: none;" type="text" name="cat" id="' +
      inputId +
      'i" value="' +
      newKeyword +
      '" >' +
      '<div class="accordion-item" id="cat">' +
      '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
      newKeyword +
      '" id="' +
      parrentId +
      '" name ="category"' +
      'class="accordion-button collapsed" type="button"' +
      'data-bs-toggle="collapse" data-bs-target="#' +
      parrentId +
      't"' +
      'aria-expanded="false" aria-controls="' +
      parrentId +
      't">' +
      '<i id="add-b" class="fas fa-plus-circle add-b"' +
      'style="padding: 10px;"></i>' +
      " " +
      newKeyword +
      '<i onclick="addAf(this)" id="bb"' +
      'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
      ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
      '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
      "<br>" +
      '<i class="fas fa-pen" style="padding: 10px;"' +
      '  onclick="editKey(this)"></i>';
    ("</button></h2>");

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    let test = parrentId.slice(0, -1);
    document.getElementById(test).innerHTML = html;

    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
  } else if (event.target.className === "fas fa-plus-circle add-b") {
    const id = event.dataTransfer.getData("text");
    let second = document.getElementById(id + "b").value.replace(/\"/g, "");
    let parrentId = event.target.parentNode.id;
    let inputId = parrentId.slice(0, -1);
    let first = event.target.parentElement.value.replace(/\"/g, "");
    let newKeyword = second + " " + first;
    console.log(newKeyword);

    let html =
      '<input style="display: none;" type="text" name="cat" id="' +
      inputId +
      'i" value="' +
      newKeyword +
      '" >' +
      '<div class="accordion-item" id="keyword">' +
      '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
      newKeyword +
      '" id="' +
      parrentId +
      '" name ="category"' +
      'class="accordion-button collapsed" type="button"' +
      'data-bs-toggle="collapse" data-bs-target="#' +
      parrentId +
      't"' +
      'aria-expanded="false" aria-controls="' +
      parrentId +
      't">' +
      '<i id="add-b" class="fas fa-plus-circle add-b"' +
      'style="padding: 10px;"></i>' +
      " " +
      newKeyword +
      '<i onclick="addAf(this)" id="bb"' +
      'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
      ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
      '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
      "<br>" +
      '<i class="fas fa-pen" style="padding: 10px;"' +
      '  onclick="editKey(this)"></i>';
    ("</button></h2>");

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    let test = parrentId.slice(0, -1);
    document.getElementById(test).innerHTML = html;

    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
  } else if(event.target.className === 'list list2'){
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
    console.log(test);
  }else {
    event.preventDefault()
  }
}

function editKey(data) {
  console.log(data.parentElement.value);
  $(".modal").modal("show");

  document.getElementById("modal-input").value = data.parentElement.value;
  document
    .getElementById("modal-input")
    .setAttribute("name", data.parentElement.id);
}

$("#modal-save").click((e) => {
  let data = document.getElementById("modal-input").value;
  console.log(data);
  let id = document.getElementById("modal-input").name;
  console.log(id);
  let inputId = id.slice(0, -1);

  // let id2 = id.slice(0, -1)
  // // $('#'+id).attr('value', 'Save');
  // let t = document.getElementById(id)
  // console.log(t)
  html =
    '<i id="add-b" class="fas fa-plus-circle add-b"' +
    'style="padding: 10px;"></i>' +
    " " +
    data +
    '<i onclick="addAf(this)" id="bb"' +
    'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
    ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
    '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
    "<br>" +
    '<i class="fas fa-pen" style="padding: 10px;"' +
    '  onclick="editKey(this)"></i>';

  document.getElementById(id).innerHTML = html;
  document.getElementById(id).value = data;
  document.getElementById(inputId + "i").value = data;
  $(".modal").modal("hide");
});

$("#modal-close").click(() => $(".modal").modal("hide"));

function delKey(data) {
  console.log(data)
  console.log('button clicked')
  let id = data.parentElement.id.slice(0, -1);
  console.log(id);
  var el = document.getElementById(id);
  el.parentNode.removeChild(el);
}

$("#relation-form").submit((e) => {
  console.log("button clicked");
  e.preventDefault();

  let data = $("#relation-form").serializeArray();

  console.log(data);

  $.ajax({
    url: "submit-keyword",
    type: "post",
    data: data,
    success: (response) => {
      console.log(response);
      if(response === true){
        $("#afteruploadmsg").html("added succes").css("color", "green").show();
        $("#afteruploadmsg").delay(1000).hide(0);
        $("#relation-form").load(location.href + " #relation-form");
      }
    },
  });
});
