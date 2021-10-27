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

// function onDragStart(event) {
//   event.dataTransfer.setData("text/plain", event.target.id);
//   event.dataTransfer.effectAllowed = 'copy'
// }

// function onDragOver(event) {
//   event.preventDefault();
// }

// var count = 0;
// let test = false;
// function onDrop(event) {
//   if (
//     event.target.className === "accordion-button collapsed" ||
//     event.target.className === "accordion-button"
//   ) {
//     event.preventDefault();
//     console.log("yess");
//   } else if (event.target.className === "fas fa-plus-circle add-a") {
//     const id = event.dataTransfer.getData("text");
//     let second = document.getElementById(id + "b").value.replace(/\"/g, "");
//     let parrentId = event.target.parentNode.id;
//     let inputId = parrentId.slice(0, -1);
//     let first = event.target.parentElement.value.replace(/\"/g, "");
//     let newKeyword = first + " " + second;

//     let html =
//       '<input style="display: none;" type="text" name="cat" id="' +
//       inputId +
//       'i" value="' +
//       newKeyword +
//       '" >' +
//       '<div class="accordion-item" id="cat">' +
//       '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
//       newKeyword +
//       '" id="' +
//       parrentId +
//       '" name ="category"' +
//       'class="accordion-button collapsed" type="button"' +
//       'data-bs-toggle="collapse" data-bs-target="#' +
//       parrentId +
//       't"' +
//       'aria-expanded="false" aria-controls="' +
//       parrentId +
//       't">' +
//       '<i id="add-b" class="fas fa-plus-circle add-b"' +
//       'style="padding: 10px;"></i>' +
//       " " +
//       newKeyword +
//       '<i onclick="addAf(this)" id="bb"' +
//       'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
//       ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
//       '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
//       "<br>" +
//       '<i class="fas fa-pen" style="padding: 10px;"' +
//       '  onclick="editKey(this)"></i>';
//     ("</button></h2>");

//     const draggableElement = document.getElementById(id);
//     const dropzone = event.target;
//     let test = parrentId.slice(0, -1);
//     document.getElementById(test).innerHTML = html;

//     dropzone.appendChild(draggableElement);
//     event.dataTransfer.clearData();
//   } else if (event.target.className === "fas fa-plus-circle add-b") {
//     const id = event.dataTransfer.getData("text");
//     let second = document.getElementById(id + "b").value.replace(/\"/g, "");
//     let parrentId = event.target.parentNode.id;
//     let inputId = parrentId.slice(0, -1);
//     let first = event.target.parentElement.value.replace(/\"/g, "");
//     let newKeyword = second + " " + first;
//     console.log(newKeyword);

//     let html =
//       '<input style="display: none;" type="text" name="cat" id="' +
//       inputId +
//       'i" value="' +
//       newKeyword +
//       '" >' +
//       '<div class="accordion-item" id="keyword">' +
//       '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
//       newKeyword +
//       '" id="' +
//       parrentId +
//       '" name ="category"' +
//       'class="accordion-button collapsed" type="button"' +
//       'data-bs-toggle="collapse" data-bs-target="#' +
//       parrentId +
//       't"' +
//       'aria-expanded="false" aria-controls="' +
//       parrentId +
//       't">' +
//       '<i id="add-b" class="fas fa-plus-circle add-b"' +
//       'style="padding: 10px;"></i>' +
//       " " +
//       newKeyword +
//       '<i onclick="addAf(this)" id="bb"' +
//       'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
//       ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
//       '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
//       "<br>" +
//       '<i class="fas fa-pen" style="padding: 10px;"' +
//       '  onclick="editKey(this)"></i>';
//     ("</button></h2>");

//     const draggableElement = document.getElementById(id);
//     const dropzone = event.target;
//     let test = parrentId.slice(0, -1);
//     document.getElementById(test).innerHTML = html;
//     dropzone.appendChild(draggableElement);
//     event.dataTransfer.clearData();
//   } else if (event.target.className === "list list2") {
//     const id = event.dataTransfer.getData("text");
//     document.getElementById(id+'del').style.display = "block"
//     document.getElementById(id+'edt').style.display = "block"
//     const draggableElement = document.getElementById(id);
//     const dropzone = event.target;
//     dropzone.appendChild(draggableElement);
//     event
//       .dataTransfer
//       .clearData();

//   } else {
//     event.preventDefault();
//   }
// }

//working

// function onDragStart(event) {
//   event.dataTransfer.setData("text/plain", event.target.id);
//   event.dataTransfer.effectAllowed = "copy";
// }

// function onDragOver(event) {
//   event.preventDefault();
// }

// let count = 0;

// function onDrop(event) {
//   const dropzone = event.target;

//   if (dropzone.className === "list list2") {
//     const id = event.dataTransfer.getData("text");
//     const draggableElement = document.getElementById(id).cloneNode(true);

//     document.getElementById(draggableElement.id).id =
//       draggableElement.id + count;

//       ///changing button value

//       count += 1;
//     dropzone.appendChild(draggableElement);
//     event.dataTransfer.clearData();
//   } else if (dropzone.className === "fas fa-plus-circle add-a") {
//     const id = event.dataTransfer.getData("text");
//     let firstValue = dropzone.parentElement.value;
//     let secondId = id.split("-")[0].replace(/-/g, "");
//     let secondValue = document.getElementById(secondId + "b").value;
//     let newKeyword = firstValue + " " + secondValue;
//     let inputId =
//       event.target.parentElement.parentElement.parentElement.parentElement.id;
//     let parrentId = event.target.parentElement.id;

//     let html =
//       '<input style="display: none;" type="text" name="cat" id="' +
//       inputId +
//       'i" value="' +
//       newKeyword +
//       '" >' +
//       '<div class="accordion-item" id="keyword">' +
//       '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
//       newKeyword +
//       '" id="' +
//       parrentId +
//       '" name =""' +
//       'class="accordion-button collapsed" type="button"' +
//       'data-bs-toggle="collapse" data-bs-target="#' +
//       parrentId +
//       't"' +
//       'aria-expanded="false" aria-controls="' +
//       parrentId +
//       't">' +
//       '<i id="add-b" class="fas fa-plus-circle add-b"' +
//       'style="padding: 10px;"></i>' +
//       " " +
//       newKeyword +
//       '<i onclick="addAf(this)" id="bb"' +
//       'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
//       ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
//       '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
//       "<br>" +
//       "</button></h2>";
//     let test =
//       dropzone.parentElement.parentElement.parentElement.parentElement.id;
//     document.getElementById(test).innerHTML = html;
//   } else if (dropzone.className === "fas fa-plus-circle add-b") {
//     const id = event.dataTransfer.getData("text");
//     let firstValue = dropzone.parentElement.value;
//     let secondId = id.split("-")[0].replace(/-/g, "");
//     let secondValue = document.getElementById(secondId + "b").value;
//     let newKeyword = secondValue + " " + firstValue;
//     let inputId =
//       event.target.parentElement.parentElement.parentElement.parentElement.id;
//     let parrentId = event.target.parentElement.id;

//     let html =
//       '<input style="display: none;" type="text" name="cat" id="' +
//       inputId +
//       'i" value="' +
//       newKeyword +
//       '" >' +
//       '<div class="accordion-item" id="keyword">' +
//       '<h2 class="accordion-header" id="headingTwo"> <button value ="' +
//       newKeyword +
//       '" id="' +
//       parrentId +
//       '" name ="category"' +
//       'class="accordion-button collapsed" type="button"' +
//       'data-bs-toggle="collapse" data-bs-target="#' +
//       parrentId +
//       't"' +
//       'aria-expanded="false" aria-controls="' +
//       parrentId +
//       't">' +
//       '<i id="add-b" class="fas fa-plus-circle add-b"' +
//       'style="padding: 10px;"></i>' +
//       " " +
//       newKeyword +
//       '<i onclick="addAf(this)" id="bb"' +
//       'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
//       ' ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
//       '<i class="fas fa-minus-circle" style="padding: 10px;"  onclick="delKey(this)"></i>' +
//       "<br>" +

//       "</button></h2>";
//     let test =
//       dropzone.parentElement.parentElement.parentElement.parentElement.id;
//     document.getElementById(test).innerHTML = html;
//   } else {
//     event.preventDefault();
//   }
// }

// let counter = 0
// function editKey(data) {
//   data.parentElement.id = data.parentElement.id +'-'
//   $(".modal").modal("show");

//   document.getElementById("modal-input").value = data.parentElement.value;
//   document
//     .getElementById("modal-input")
//     .setAttribute("name", data.parentElement.id);
// }

// $("#modal-save").click((e) => {
//   let data = document.getElementById("modal-input").value;
//   console.log(data);
//   let id = document.getElementById("modal-input").name;
//   let newId = id.replace(/-/g, "");
//   console.log(id);
//   console.log(newId)
//   let inputId = newId.slice(0, -1);
//   console.log(this.id)

//   // let id2 = id.slice(0, -1)
//   // // $('#'+id).attr('value', 'Save');
//   // let t = document.getElementById(id)
//   // console.log(t)

//   let  html = '  <i id="add-b" class="fas fa-plus-circle add-b" '+
// 'style="padding: 10px;"></i>'+
// ' '+data+'<i id="d'+id+'-a" class="fas fa-plus-circle add-a" '+
// 'style="padding: 10px;" ondragover="onDragOver(event);" '+
// 'ondrop="onDrop(event);"></i>'+
//  '<i class="fas fa-minus-circle"  id="d'+id+'del" style="padding: 10px; display:none;" '+
//  'onclick="delKey(this)"></i> '+
//  '<br>'+
//  '<i class="fas fa-pen" id="d'+id+'edt" style="padding: 10px; display:none" '+
//  'onclick="editKey(this)"></i>'

//   document.getElementById(id).innerHTML = html;
//   document.getElementById(id).value = data;
//   document.getElementById(inputId + "i").value = data;
//   $(".modal").modal("hide");
// });

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.effectAllowed = "copy";
}

function onDragOver(event) {
  event.preventDefault();
}

let count = 0;

function onDrop(event) {
  const dropzone = event.target;
  if (dropzone.className === "list list2") {
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id).cloneNode(true);

    document.getElementById(draggableElement.id).id =
      draggableElement.id + count;
    count += 1;
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
  } else if (dropzone.className === "fas fa-plus-circle add-a") {
    const id = event.dataTransfer.getData("text");
    const parrentId = dropzone.parentElement.parentElement.id;
    const firstValue = dropzone.parentElement.value;
    let secondId = id.split("-")[0].replace(/-/g, "");
    const secondValue = document.getElementById(secondId + "i").value;
    const keyword = firstValue + " " + secondValue;

    console.log("parre", parrentId);
    let html =
      '<input type="text" value="' +
      keyword +
      '" name="cat" id="' +
      parrentId +
      'i" style="display: none;">' +
      '<button value="' +
      keyword +
      '" style="all: unset;" id="' +
      parrentId +
      'b">' +
      '<i id="add-b" class="fas fa-plus-circle add-b" style="padding: 10px;"></i>' +
      "" +
      keyword +
      '<i id="' +
      parrentId +
      '-a" ' +
      'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
      'ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
      ' <i class="fas fa-pen-square" style="padding: 10px;" onclick="editKeyword(event,this)"></i>' +
      '  <i class="fas fa-minus-circle" style="padding: 10px;"' +
      'onclick="delKey(this)" id="' +
      parrentId +
      'd"></i>' +
      "</button>";

    document.getElementById(parrentId).innerHTML = html;

    //   let secondId = id.split("-")[0].replace(/-/g, "");
    // let secondValue = document.getElementById(secondId + "b").value;
  } else if (dropzone.className === "fas fa-plus-circle add-b") {
    const id = event.dataTransfer.getData("text");
    const parrentId = dropzone.parentElement.parentElement.id;
    const firstValue = dropzone.parentElement.value;
    let secondId = id.split("-")[0].replace(/-/g, "");
    const secondValue = document.getElementById(secondId + "i").value;
    const keyword = secondValue + " " + firstValue;
    console.log(parrentId);
    let html =
      '<input type="text" name="cat" value="' +
      keyword +
      '" id="' +
      parrentId +
      'i" style="display: none;">' +
      '<button value="' +
      keyword +
      '" style="all: unset;" id="' +
      parrentId +
      'b">' +
      '<i id="add-b" class="fas fa-plus-circle add-b" style="padding: 10px;"></i>' +
      "" +
      keyword +
      '<i id="' +
      parrentId +
      '-a" ' +
      'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
      'ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
      ' <i class="fas fa-pen-square" style="padding: 10px;" onclick="editKeyword(event,this)"></i>' +
      '<i class="fas fa-minus-circle" style="padding: 10px;"' +
      'onclick="delKey(this)" id="' +
      parrentId +
      'd"></i>' +
      "</button>";

    document.getElementById(parrentId).innerHTML = html;
  }
}

function editKeyword(e, data) {
  e.preventDefault();
  console.log(data);
  console.log(data.parentElement);
  let parrentId = data.parentElement.parentElement.id;
  $(".modal").modal("show");
  document.getElementById("modal-input").value = data.parentElement.value;

  $("#modal-save").click((e) => {
    let editedData = document.getElementById("modal-input").value;

    let html =
      '<input type="text" name="cat" value="' +
      editedData +
      '" id="' +
      parrentId +
      'i" style="display: none;">' +
      '<button value="' +
      editedData +
      '" style="all: unset;" id="' +
      parrentId +
      'b">' +
      '<i id="add-b" class="fas fa-plus-circle add-b" style="padding: 10px;"></i>' +
      "" +
      editedData +
      '<i id="' +
      parrentId +
      '-a" ' +
      'class="fas fa-plus-circle add-a" style="padding: 10px;"' +
      'ondragover="onDragOver(event);" ondrop="onDrop(event);"></i>' +
      ' <i class="fas fa-pen-square" style="padding: 10px;" onclick="editKeyword(event,this)"></i>' +
      '<i class="fas fa-minus-circle" style="padding: 10px;"' +
      'onclick="delKey(this)" id="' +
      parrentId +
      'd"></i>' +
      "</button>";

    document.getElementById(parrentId).innerHTML = html;
    $(".modal").modal("hide");

    return false;
  });
  return false;
}

$("#modal-close").click(() => $(".modal").modal("hide"));

function delKey(data) {
  console.log("button clicked");
  let id = data.parentElement.id.slice(0, -1);
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
      if (response === true) {
        console.log(location);
        $("#afteruploadmsg").html("added succes").css("color", "green").show();
        $("#afteruploadmsg").delay(1000).hide(0);
        $("#relation-form").load(location.href + " #relation-form");
      }
    },
  });
});
