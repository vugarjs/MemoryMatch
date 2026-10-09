
const images = [
    "./assets/img/cplus.svg",
    "./assets/img/php.svg",
    "./assets/img/python.svg",
    "./assets/img/javascript.svg",
    "./assets/img/html.svg",
    "./assets/img/css.svg",
    "./assets/img/csharp.svg",
    "./assets/img/java.svg"
];

const cards = [...images, ...images];
const gameCards = document.querySelectorAll(".game-card");

let firstCard = null;
let secondCard = null;
let isLocked = false;
let matchCount = 0;

cards.sort(() => Math.random() - 0.5);

gameCards.forEach((card, index) => {
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">
                <img src="${cards[index]}" alt="card image" class="card-image">
            </div>
        </div>
    `;
});

gameCards.forEach((card) => {
    card.addEventListener("click", () => {

        if (card.classList.contains("matched")) {
            return;
        }

        if (isLocked) {
            return;
        }

        if (firstCard === null) {
            firstCard = card;
            card.classList.add("flipped");
        }
        else if (secondCard === null && card !== firstCard) {
            secondCard = card;
            card.classList.add("flipped");

            if (
                firstCard.querySelector(".card-image").src ===
                secondCard.querySelector(".card-image").src
            ) {
                console.log("Match!");

                matchCount++;
                console.log("Match count: " + matchCount);

                secondCard.classList.add("matched");
                firstCard.classList.add("matched");

                firstCard = null;
                secondCard = null;

                if (matchCount === 8) {
                    Swal.fire({
                        title: "Game Over!",
                        text: "Congratulations! You've matched all the cards!",
                        icon: "success"
                    });
                    setTimeout(() => {

                        location.reload();
                    }, 5000);
                }
            }
            else {
                isLocked = true;

                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");

                    firstCard = null;
                    secondCard = null;
                    isLocked = false;
                }, 1000);

                console.log("No match!");
            }
        }
    });
});
