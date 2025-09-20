// players.js

const serverIP = 'play.mralooyt.fun';

function updatePlayerList() {
  fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
    .then(response => response.json())
    .then(data => {
      let listContainer = document.getElementById('player-list');
      listContainer.innerHTML = ''; // Clear old list

      if (!data.online) {
        listContainer.innerHTML = '<li>Server Offline</li>';
        return;
      }

      // Java players
      let javaPlayers = data.players && data.players.list ? data.players.list : [];

      // Bedrock players (raw)
      let bedrockPlayers = data.info && data.info.raw ? data.info.raw : [];

      // Merge both into one list
      let allPlayers = [...javaPlayers, ...bedrockPlayers];

      if (allPlayers.length === 0) {
        listContainer.innerHTML = '<li>No players online</li>';
        return;
      }

      // Add each player to the list
      allPlayers.forEach(player => {
        let li = document.createElement('li');
        li.innerText = player;
        listContainer.appendChild(li);
      });
    })
    .catch(error => {
      console.log('Error fetching server data:', error);
      document.getElementById('player-list').innerHTML = '<li>Error fetching data</li>';
    });
}

// Run immediately and refresh every 30s
updatePlayerList();
setInterval(updatePlayerList, 30000);
