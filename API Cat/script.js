// DOM Elements
const searchBar = document.getElementById("searchBar");
const catImage = document.getElementById("catImage");
const catBreed = document.getElementById("catBreed");
const catOrigin = document.getElementById("catOrigin");
const catDescription = document.getElementById("catDescription");
const resultCard = document.getElementById("resultCard");

// Function to search for cat breeds
const searchBreed = async () => {
    const searchTerm = searchBar.value.trim().toLowerCase();

    // Clear previous results and hide the result card
    resultCard.classList.add("d-none");
    catBreed.textContent = "Breed: ...";
    catOrigin.textContent = "Origin: ...";
    catDescription.textContent = "Description: ...";
    catImage.src = "";

    // Check if the search term is empty
    if (!searchTerm) {
        alert("Please enter a cat breed to search.");
        return;
    }

    try {
        // Fetch all breeds
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        if (!response.ok) throw new Error("Failed to fetch breed data.");
        const breeds = await response.json();

        // Find matching breed
        const breed = breeds.find(b => b.name.toLowerCase().includes(searchTerm));

        if (breed) {
            // Fetch image for the breed
            const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`);
            if (!imageResponse.ok) throw new Error("Failed to fetch image data.");
            const imageData = await imageResponse.json();

            // Populate result card
            catBreed.textContent = `Breed: ${breed.name}`;
            catOrigin.textContent = `Origin: ${breed.origin}`;
            catDescription.textContent = `Description: ${breed.description}`;
            catImage.src = imageData[0]?.url || "https://via.placeholder.com/150?text=No+Image";

            // Display result card
            resultCard.classList.remove("d-none");
        } else {
            alert("Breed not found. Please try another search.");
        }
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
};
