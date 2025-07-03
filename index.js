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
  1: 1,
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

let sum = 0;
let dsum = 0;
let total_money = 1000;
let win = 0;
let lose = 0;
let bet = 0;

function placeBet() {
  bet = parseInt(document.getElementById("bet-el").value); // Get the bet value from the input field
  if (bet <= 0 || isNaN(bet)) {
    alert("Please enter a valid bet.");
  } else if (bet > total_money) {
    alert("You cannot bet more than your total money.");
  } else {
    moneyEl.innerText = "Balance: $" + total_money;
    startGame();
  }
  console.log("Bet placed: $" + bet);
}

function cards() {
  const letters = ["A", "B", "C", "D"];
  const randomIndex = Math.floor(Math.random() * letters.length);
  const letter = letters[randomIndex];
  // Random number from 1 to 13
  const number = Math.floor(Math.random() * 13) + 1;
  return letter + number;
}
// Initialize dealer and player cards
// dealer_Cards will have 2 cards, player_Cards will have 3 cards
let dealer_Cards = [cards(), cards()];
let player_Cards = [cards(), cards(), cards()];

function reset() {
  // Reset the game
  player_Card1.style.backgroundImage = "url('cards/back.png')";
  player_Card2.style.backgroundImage = "url('cards/back.png')";
  player_Card3.style.backgroundImage = "url('cards/back.png')";
  dealer_Card1.style.backgroundImage = "url('cards/back.png')";
  dealer_Card2.style.backgroundImage = "url('cards/back.png')";
  player_Card3.style.display = "none"; // Hide the third card initially
}

function startGame() {
  reset(); // Reset the game state
  dealer_Cards = [cards(), cards()];
  player_Cards = [cards(), cards(), cards()];
  let card_value1 = parseInt(player_Cards[0].slice(1));
  let card_value2 = parseInt(player_Cards[1].slice(1));
  let dcard_value1 = parseInt(dealer_Cards[0].slice(1));
  let dcard_value2 = parseInt(dealer_Cards[1].slice(1));
  dsum = player_number[dcard_value1] + player_number[dcard_value2];
  dealer_Card1.style.backgroundImage =
    "url('cards/" + dealer_Cards[0] + ".png')";
  player_Card1.style.backgroundImage =
    "url('cards/" + player_Cards[0] + ".png')";
  player_Card2.style.backgroundImage =
    "url('cards/" + player_Cards[1] + ".png')";
  sum = player_number[card_value1] + player_number[card_value2];
  sumEl.innerText = "Sum: " + sum;

  console.log(card_value1, card_value2, dcard_value1, dcard_value2);
}

function stand() {
  dealer_diff = 21 - dsum;
  player_diff = 21 - sum;
  total_money -= bet;
  moneyEl.innerText = "Balance: $" + total_money;
  dealer_Card2.style.backgroundImage =
    "url('cards/" + dealer_Cards[1] + ".png')";

  if (sum > 21) {
    msgEl.innerText = "You Lose! Do you want to play again?";
    lose += 1;
  } else {
    if (dealer_diff > player_diff) {
      msgEl.innerText = "You Win! Do you want to play again?";
      win += 1;
      total_money += bet * 2;
      moneyEl.innerText = "Balance: $" + total_money;
    } else if (dealer_diff === player_diff) {
      msgEl.innerText = "It's a Draw! Do you want to play again?";
      total_money += bet; // return the bet
    } else {
      msgEl.innerText = "You Lose! Do you want to play again?";
      lose += 1;
    }
  }
  // Show the modal
  setTimeout(() => {
    // next part of logic — heavy calculations, modal open, etc.
    document.getElementById("myModal").style.display = "flex";
  }, 10);
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
  player_Card3.style.display = "block"; // Show the third card
  let card_value3 = parseInt(player_Cards[2].slice(1));
  sum += player_number[card_value3];
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
  msgEl.innerText = "You lose half of your bet. ";
  lose += 1;
  total_money -= bet / 2; // lose half of the bet
  moneyEl.innerText = "Balance: $" + total_money;
  setTimeout(() => {
    // next part of logic — heavy calculations, modal open, etc.
    document.getElementById("myModal").style.display = "flex";
  }, 10);
}

function Yes() {
  document.getElementById("myModal").style.display = "none";
  startGame;
}

function No() {
  document.getElementById("myModal").style.display = "none";
  reset();
  if (total_money <= 0) {
    alert(
      "You have no money left to play. Please refresh the page to start over."
    );
  } else {
    moneyEl.innerText = "Balance: $" + total_money;
    alert("Thank you for playing! Your total money is: $" + total_money);
  }
}

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "H") {
    hit(); // Call your custom function here
  }
});

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "S") {
    stand(); // Call your custom function here
  }
});

document.addEventListener("keydown", function (event) {
  // Check if Shift + M is pressed
  if (event.key === "D") {
    double_down(); // Call your custom function here
  }
});
