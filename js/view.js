function getCompetitionsView(data) {
    let getCompetitionsHTML = ``;

    // get multiple data with forEach, make the UI adapt with dynamic data
    data.competitions.forEach(function(competition) {
    getCompetitionsHTML += `
        <div class="card">
        <a href="./pages/competition.html?id=${competition.id}">
            <span class="card-title truncate">${competition.name}</span>
        </a>
        </div>
        `;
    });

    // attach getCompetitionsHTML to element with id competitions
    return getCompetitionsHTML;
}

function getCompetitionByIdView(data) {
    let getCompetitionByIdHTML = `
        <h2 class="header-container">Competition Standings</h2>

        <h3 class="header-container">${data.competition.name}</h3>
        <table class="striped">
            <thead>
                <tr>
                    <th>Crest</th>
                    <th>Name</th>
                    <th>Played Games</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
    `;

    if(isEmpty(data) || isEmpty(data.standings[0])) {
        getCompetitionByIdHTML += `
            <tr>
                <td colspan="7">
                    <center><h4>No data can be shown</h4><center>
                </td>
            </tr>
        `;
    } else {
        // get multiple data with forEach, make the UI adapt with dynamic data
        data.standings[0].table.forEach(function(team) {
            getCompetitionByIdHTML += `
                <tr>
                    <td>
                        <img src="${team.team.crestUrl}" alt="club logo" style="height: 15px;">
                    </td>
                    <td>${team.team.name}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.points}</td>
                </tr>
            `;
        });
    }

    getCompetitionByIdHTML += `
        </tbody>
        </table>
    `;
    
    // attach getCompetitionByIdHTML to element with id competition-content
    return getCompetitionByIdHTML;
}

function getSavedCompetitionsView(data) {
    let getSavedCompetitionsHTML = ``;

    if(isEmpty(data)) {
        getSavedCompetitionsHTML += `
            <h4>No saved data</h4>
        `;
    } else {
        // get dynamic data with forEach
        data.forEach(function(data) {
            getSavedCompetitionsHTML += `
            <div class="card">
                <a href="./pages/competition.html?id=${data.competition.id}&saved=true">
                <span class="card-title truncate">${data.competition.name}</span>
                </a>
            </div>
            `;
        });
    }

    return getSavedCompetitionsHTML;
}

function getSavedCompetitionByIdView(data) {
    // initialize getSavedCompetitionByIdHTML with header
    let getSavedCompetitionByIdHTML = `
    <h2 class="header-container">Saved Competition Standings</h2>
    <h3 class="header-container">${data.competition.name}</h3>

    <table class="striped">
      <thead>
        <tr>
          <th>Crest</th>
          <th>Name</th>
          <th>Played Games</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
    `;

    data.standings[0].table.forEach(function(team) {
      getSavedCompetitionByIdHTML += `
          <tr>
            <td>
              <img src="${team.team.crestUrl}" alt="club logo" style="height: 15px;">
            </td>
            <td>${team.team.name}</td>
            <td>${team.playedGames}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td>${team.points}</td>
          </tr>
      `;
    });   

    getSavedCompetitionByIdHTML += `
        </tbody>
      </table>
    `;

    return getSavedCompetitionByIdHTML;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}