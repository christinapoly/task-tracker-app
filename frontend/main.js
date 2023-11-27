document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(data => loadTable(data['data']));
});

document.querySelector('table tbody').addEventListener('click', function(event) {
  console.log(event.target); 
})
const addBtn = document.getElementById('add-name-btn');

addBtn.onclick = function () {
  const nameInput = document.getElementById('name-input');
  const name = nameInput.value;
nameInput.value = "";

fetch('http://localhost:3000/add', {
  headers: {
    'Content-type': 'application/json'
  },

  method: 'POST',
  body: JSON.stringify({name : name})
})
.then(response => response.json())
.then(data => insertRowIntoTable(data['data']))
}

function insertRowIntoTable(data) {
  const table = document.querySelector('table tbody');
  const isTableData = table.querySelector('.no-data');

  let tableHtml = '<tr>';

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
        if (key === 'dateAdded') {
            data[key] = new Date(data[key]).toLocaleString();
        }
        tableHtml += `<td>${data[key]}</td>`;
      }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;

    tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }

}


function loadTable(data) {
  const table = document.querySelector('table tbody');

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data'colspan='6'>You have not added any tasks yet</td></tr>";
    return;

  }
  let tableHtml = "";

  data.forEach(function({id, name, date_added, date_updated}) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td>${new Date(date_updated).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += "</tr>";
  });
  table.innerHTML = tableHtml;
}