
  const serverIP = 'play.mralooyt.fun';

  function updateOnlinePlayers() {
    fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
      .then(response => response.json())
      .then(data => {
        let playerCount = data.online ? data.players.online : 'Server Offline';

        // Update all elements with the class "online-count"
        document.querySelectorAll('.online-count').forEach(el => {
          el.innerText = playerCount;
        });
      })
      .catch(error => {
        console.log('Error fetching server data:', error);
        document.querySelectorAll('.online-count').forEach(el => {
          el.innerText = 'Error';
        });
      });
  }

  updateOnlinePlayers();
  setInterval(updateOnlinePlayers, 30000);
