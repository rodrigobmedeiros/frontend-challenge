// after run open_json.js, I'll have information avaiable in a global scope.
// get all sites
var sites = data["sites"];

// get table body to include elements.
var tableRef = document.getElementById('table').getElementsByTagName('tbody')[0];
var countSites = 0;

for (let site of sites) {
    tableRef.innerHTML += `
    <tr id="tr-${countSites}">
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
    countSites += 1;
}

function getAlertDetails(index) {
    var siteToGetDetails = sites[index];
    var alerts = siteToGetDetails['Alerts'];
    var details = [];

    for (let key in alerts) {
        var alert = alerts[key];

        if ("details" in alert) {
            details = [...details, ...alert['details']];
        }
    }

    return details;
}


// Add click event to tr elements
$('#table tbody tr').click(function() {
    
    // Get the id of clicked tr element.
    var trId = $(this).attr('id');

    // Get site index to extract information.
    var index = trId.split('-')[1];

    var clickedSite = sites[index];

    var baseCard = document.getElementById('base-alert-card');
    baseCard.innerHTML = `
    <div class="container">
        <div class="card">
            <div class="card-body" id="current-site">
                <h4 class="card-title">${clickedSite['Name']}</h4>
            </div>
            </div>
        </div>
    </div>
    `
    // Get details from clicked site
    var details = getAlertDetails(index)

    var currentCart = document.getElementById('current-site');

    if (details.length === 0) {
        currentCart.innerHTML += `
        <div class="card text-white bg-secondary">
            <div class="card-body">
                <p class="card-text">There is no alerts!</p>
            </div>
            </div>
        </div>
        <br>
        `
    }

    for (let detail of details) {
        currentCart.innerHTML += `
        <div class="card text-white bg-info">
            <div class="card-body">
                <h4 class="card-title">${detail['metric']}</h4>
                <p class="card-text">Value: ${detail['value']} ${detail['unit']}</p>
                <p class="card-text">Time: ${detail['time']}</p>
            </div>
            </div>
        </div>
        <br>
        `
    }

    $(this).addClass('bg-success').siblings().removeClass('bg-success');

});