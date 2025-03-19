document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('foodForm');
    const foodContainer = document.getElementById('foodContainer');
    let foods = []; // Array to store food items

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        const foodName = document.getElementById('foodName').value.trim();
        const imageUrl = document.getElementById('imageLink').value.trim();
        const rank = parseInt(document.getElementById('rank').value.trim(), 10);
        const description = document.getElementById('description').value.trim();

        if (!foodName || !description || !imageUrl || isNaN(rank) || rank <= 0) { // Checker for validation of forms
            alert('Please fill in all fields correctly and ensure Rank is a positive integer.');
            return;
        }

        const duplicate = foods.some(f => f.rank === rank); // rank can't be duplicated
        if (duplicate) {
            alert(`Rank ${rank} is already taken. Please choose a different rank.`);
            return;
        }

        const newFood = { foodName, description, imageUrl, rank };
        foods.push(newFood); // Adds new food to the array
        foods.sort((a, b) => a.rank - b.rank); // Sorts the foods by rank (1 onwards)

        updateFoodCards(); // Updates food cards on the webpage
        form.reset(); // Resets the form for new inputs
    });

    function updateFoodCards() {
        foodContainer.innerHTML = ''; // Clears the previous contents
        foods.forEach((food) => {
            const foodCard = document.createElement('div');
            foodCard.classList.add('foodCard');

            const img = document.createElement('img'); // The following lines create a respective elements for the food's information
            img.src = food.imageUrl;
            img.alt = food.foodName;
            foodCard.appendChild(img); // Food Image

            const rankInfo = document.createElement('p');
            rankInfo.textContent = `RANK: ${food.rank}`;
            foodCard.appendChild(rankInfo); // Food Rank

            const title = document.createElement('h3');
            title.textContent = food.foodName;
            foodCard.appendChild(title); // Food Name

            const desc = document.createElement('p');
            desc.textContent = food.description;
            foodCard.appendChild(desc); // Food Description

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete'; // Delete button

            deleteBtn.addEventListener('click', () => {
                deleteFood(food); // Calls the function for deleting food
                updateFoodCards(); // Update food cards after deletion
            });

            foodCard.appendChild(deleteBtn);
            foodContainer.appendChild(foodCard); // Appends the food card to foodContainer
        });
    }

    function deleteFood(food) { // Deletes the food from the array
        for (let i = 0; i < foods.length; i++) {
            if (foods[i] === food) {
                foods.splice(i, 1); // Removes 1 element at index i
                break;
            }
        }
    }
}); 