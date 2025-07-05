let sumEl = document.getElementById("sum-el");
let msgEl = document.getElementById("msg-el");
let moneyEl = document.getElementById("money-el");
let winloseEl = document.getElementById("win-lose-el");
let dealer_Card1 = document.getElementById("dealer-card-1");
let dealer_Card2 = document.getElementById("dealer-card-2");
let player_Card1 = document.getElementById("player-card-1");
let player_Card2 = document.getElementById("player-card-2");
let player_Card3 = document.getElementById("player-card-3");
let player_number = {
  1: 11,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
};
const letters = ["A", "B", "C", "D"];
const ranks = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
const fullDeck = [];
let dealer_Cards = [];
let player_Cards = [];
let sum = 0;
let dsum = 0;
let total_money = 1000;
let win = 0;
let lose = 0;
let bet = 0;

function generateDeck() {
  fullDeck.length = 0; // Clear the existing deck
  // Generate a full deck of cards
  for (let letter of letters) {
    for (let rank of ranks) {
      fullDeck.push(letter + rank);
    }
  }
  // Shuffle the deck
  for (let i = fullDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]]; // Swap elements
  }
}

function enableButtons() {
  document.getElementById("hit-btn").disabled = false;
  document.getElementById("stand-btn").disabled = false;
  document.getElementById("ddown-btn").disabled = false;
  document.getElementById("surrender-btn").disabled = false;
}

function placeBet() {
  generateDeck(); // Ensure the deck is generated before placing a bet
  bet = parseInt(document.getElementById("bet-el").value); // Get the bet value from the input field
  if (bet <= 0 || isNaN(bet)) {
    alert("Please enter a valid bet.");
    disableButtons(); // Disable buttons if the bet is invalid
  } else if (bet > total_money) {
    alert("You cannot bet more than your total money.");
    disableButtons(); // Disable buttons if the bet is invalid
  } else {
    moneyEl.innerText = "Balance: $" + total_money;
    enableButtons(); // Enable buttons after placing a bet
    startGame();
  }
  console.log("Bet placed: $" + bet);
}

function cards() {
  const index = Math.floor(Math.random() * fullDeck.length);
  const card = fullDeck.splice(index, 1)[0]; // removes the card
  console.log("Card drawn: " + card);
  console.log("Remaining cards in deck: " + fullDeck.length);
  return card;
}
// Initialize dealer and player cards
// dealer_Cards will have 2 cards, player_Cards will have 3 cards

function reset() {
  // Reset the game
  bet = parseInt(document.getElementById("bet-el").value); // Get the bet value from the input field
  player_Card1.style.backgroundImage = "url('cards/back.png')";
  player_Card2.style.backgroundImage = "url('cards/back.png')";
  player_Card3.style.backgroundImage = "url('cards/back.png')";
  dealer_Card1.style.backgroundImage = "url('cards/back.png')";
  dealer_Card2.style.backgroundImage = "url('cards/back.png')";
  player_Card3.style.display = "none"; // Hide the third card initially
  if (fullDeck.length <= 4) {
    // If the deck is running low, regenerate it
    generateDeck();
  }
}

function startGame() {
  reset(); // Reset the game state

  if (bet > total_money) {
    alert("You cannot bet more than your total money.");
    disableButtons();
    return; // Exit the function if the bet is invalid
  }

  dealer_Cards = [cards(), cards()];
  player_Cards = [cards(), cards(), cards()];
  let card_value1 = parseInt(player_Cards[0].slice(1));
  let card_value2 = parseInt(player_Cards[1].slice(1));
  let dcard_value1 = parseInt(dealer_Cards[0].slice(1));
  let dcard_value2 = parseInt(dealer_Cards[1].slice(1));
  sum = player_number[card_value1] + player_number[card_value2];
  dsum = player_number[dcard_value1] + player_number[dcard_value2];

  // Disable ddown button if total money is less than double the bet
  if (total_money < bet * 2) {
    document.getElementById("ddown-btn").disabled = true;
  }

  // Check for Ace in player's first two cards
  if (sum === 22) {
    sum = 12; // If both are Aces, treat one as 1 instead of 11
  }

  // Check for Ace in dealer's first two cards
  if (dsum === 22) {
    dsum = 12; // If both are Aces, treat one as 1 instead of 11
  }

  // Display the cards
  dealer_Card1.style.backgroundImage =
    "url('cards/" + dealer_Cards[0] + ".png')";
  player_Card1.style.backgroundImage =
    "url('cards/" + player_Cards[0] + ".png')";
  player_Card2.style.backgroundImage =
    "url('cards/" + player_Cards[1] + ".png')";
  sumEl.innerText = "Sum: " + sum;

  if (sum === 21 && dsum === 21) {
    dealer_Card2.style.backgroundImage =
      "url('cards/" + dealer_Cards[1] + ".png')"; // Reveal dealer's second card
    msgEl.style.color = " #4d4d4d";
    msgEl.innerText = "It's a Draw!";
    total_money += bet; // return the bet
    moneyEl.innerText = "Balance: $" + total_money;
    winloseEl.innerText = "W: " + win + "  L: " + lose;
    setTimeout(() => {
      document.getElementById("myModal").style.display = "flex";
    }, 1000);
  } else if (sum === 21) {
    dealer_Card2.style.backgroundImage =
      "url('cards/" + dealer_Cards[1] + ".png')"; // Reveal dealer's second card
    msgEl.style.color = "green";
    msgEl.innerText = "Blackjack! You win!";
    updateBalance(bet * 2.5); // Player wins 2.5 times the bet
    total_money += bet * 2.5; // Player wins 2.5 times the bet
    moneyEl.innerText = "Balance: $" + total_money;
    win += 1;
    updateWinLoss (true); // Update win/loss count
    //winloseEl.innerText = "W: " + win + "  L: " + lose;
    setTimeout(() => {
      document.getElementById("myModal").style.display = "flex";
    }, 1000);
  } else if (dsum === 21) {
    dealer_Card2.style.backgroundImage =
      "url('cards/" + dealer_Cards[1] + ".png')"; // Reveal dealer's second card
    msgEl.style.color = "red";
    msgEl.innerText = "Dealer has Blackjack! You lose!";
    updateBalance(-bet); // Player loses the bet
    total_money -= bet; // Player loses the bet
    moneyEl.innerText = "Balance: $" + total_money;
    lose += 1;
    updateWinLoss (false); // Update win/loss count
    //winloseEl.innerText = "W: " + win + "  L: " + lose;
    setTimeout(() => {
      document.getElementById("myModal").style.display = "flex";
    }, 1000);
  }

  console.log(card_value1, card_value2, dcard_value1, dcard_value2);
}

function stand() {
  dealer_diff = 21 - dsum;
  player_diff = 21 - sum;

  if (bet > total_money) {
    alert("You cannot bet more than your total money.");
    disableButtons();
    return; // Exit the function if the bet is invalid
  }

  total_money -= bet;
  moneyEl.innerText = "Balance: $" + total_money;
  dealer_Card2.style.backgroundImage =
    "url('cards/" + dealer_Cards[1] + ".png')";

  if (sum > 21) {
      msgEl.style.color = "red";
      msgEl.innerText = "You Lose!";
      updateBalance(-bet); // Player loses the bet
      updateWinLoss (false); // Update win/loss count
      lose += 1;
  }else {
    if (dealer_diff > player_diff) {
      msgEl.style.color = "green";
      msgEl.innerText = "You Win!";
      updateBalance(bet * 2.5); // Player wins 2.5 times the bet
      updateWinLoss (true); // Update win/loss count
      win += 1;
      total_money += bet * 2.5; // Player wins 2.5 times the bet
      moneyEl.innerText = "Balance: $" + total_money;
    } else if (dealer_diff === player_diff) {
      msgEl.style.color = " #4d4d4d";
      msgEl.innerText = "It's a Draw!";
      total_money += bet; // return the bet
    } else {
      msgEl.style.color = "red";
      msgEl.innerText = "You Lose!";
      updateBalance(-bet); // Player loses the bet
      updateWinLoss (false); // Update win/loss count
      lose += 1;
    }
  }
  // Show the modal
  setTimeout(() => {
    // next part of logic — heavy calculations, modal open, etc.
    document.getElementById("myModal").style.display = "flex";
  }, 2000);
  winloseEl.innerText = "W: " + win + "  L: " + lose;

  console.log("BET:" + bet + " total_money:" + total_money);
  console.log(
    "Dealer Cards: " +
      dealer_Cards[0] +
      "  " +
      dealer_Cards[1] +
      "  Sum: " +
      dsum
  );
}

function hit() {
  if (bet > total_money) {
    alert("You cannot bet more than your total money.");
    disableButtons();
    return; // Exit the function if the bet is invalid
  }

  player_Card3.style.display = "block"; // Show the third card
  let card_value3 = parseInt(player_Cards[2].slice(1));
  sum += player_number[card_value3];

  if (sum > 21 && player_Cards.some((card) => card.slice(1) === "1")) {
      sum -= 10; // Adjust for Ace if player busts
  }
  player_Card3.style.backgroundImage =
    "url('cards/" + player_Cards[2] + ".png')";
  sumEl.innerText = "Sum: " + sum;
  stand();
}

function double_down() {
  bet *= 2; // double the bet
  hit();
}

function surrender() {
  msgEl.style.color = "red";
  msgEl.innerText = "You lose half of your bet. ";
  updateBalance(-bet / 2); // Player loses half of the bet
  updateWinLoss (false); // Update win/loss count
  lose += 1;
  total_money -= bet / 2; // lose half of the bet
  moneyEl.innerText = "Balance: $" + total_money;
  setTimeout(() => {
    // next part of logic — heavy calculations, modal open, etc.
    document.getElementById("myModal").style.display = "flex";
  }, 100);
}

function disableButtons() {
  document.getElementById("hit-btn").disabled = true;
  document.getElementById("stand-btn").disabled = true;
  document.getElementById("ddown-btn").disabled = true;
  document.getElementById("surrender-btn").disabled = true;
}

function Yes() {
  document.getElementById("myModal").style.display = "none";
  if (total_money <= 0) {
    alert(
      "You have no money left to play. Please refresh the page to start over."
    );
    disableButtons();
  }
  startGame();
}

function No() {
  document.getElementById("myModal").style.display = "none";
  reset();
  disableButtons();
  if (total_money <= 0) {
    alert(
      "You have no money left to play. Please refresh the page to start over."
    );
    disableButtons();
  } else {
    moneyEl.innerText = "Balance: $" + total_money;
    alert("Thank you for playing! Your total money is: $" + total_money);
  }
}

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "h") {
    hit(); // Call your custom function here
  }
});

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "s") {
    stand(); // Call your custom function here
  }
});

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "d") {
    double_down(); // Call your custom function here
  }
});


const username = 'rolando';  // Replace with dynamic username if needed
const API_BASE = "https://blackjack-backend-b1d0.onrender.com";

// Get player info
fetch(`${API_BASE}/player/${username}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('.balance').innerText = 'Balance: $' + data.balance;
    total_money = data.balance; // Initialize total_money with player's balance
    win = data.wins; // Initialize win count
    lose = data.losses; // Initialize lose count
    winloseEl.innerText = "W: " + win + "  L: " + lose; // Update win/loss display
    moneyEl.innerText = "Balance: $" + total_money; // Update the displayed balance
  });

// Update player balance (e.g. after a win/loss)
function updateBalance(amount) {
  fetch(`${API_BASE}/player/${username}/balance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  })
  .then(res => res.json())
  .then(data => {
    document.querySelector('.balance').innerText = 'Balance: $' + data.balance;
    
    // Play coin sound
    const coinSound = document.getElementById('coin-sound');
    coinSound.currentTime = 0; // rewind to start
    coinSound.play().catch(err => {
    console.warn('Sound playback failed:', err);
  });
  });
}

function updateWinLoss(win) {
  //http://localhost:5000/@app_route
  fetch(`${API_BASE}/update_winloss`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username, // make sure username is defined globally
      win: win            // true or false
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      console.error(data.error);
    } else {
      winloseEl.innerText = "W: " + data.wins + "  L: " + data.losses;
    }
  })
  .catch(err => console.error('Fetch error:', err));
}
