    function placeBet() {
      const bet = document.getElementById('bet').value;
      if (bet <= 0 || isNaN(bet)) {
        alert("Please enter a valid bet.");
      } else {
        alert("You placed a bet of $" + bet);
      }
    }