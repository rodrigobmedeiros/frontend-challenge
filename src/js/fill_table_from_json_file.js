// after run open_json.js, I'll have information avaiable in a global scope.
// get all sites
var sites = data["sites"];

// get table body to include elements.
var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];

for (let site of sites) {
    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = `
    <tr>
        <td><strong>${site["Name"]}</strong></td>
        <td>
            <label class="badge badge-success">${site["Alerts"]["high"]["count"]}</label>
            <label class="badge badge-warning">${site["Alerts"]["med"]["count"]}</label>
            <label class="badge badge-danger">${site["Alerts"]["low"]["count"]}</label>
        </td>
        <td>${site["Savings"]}</td>
        <td>${site["Uptime"]}</td>
        <td>${site["Power"]}</td>
    </tr>
    `;
}