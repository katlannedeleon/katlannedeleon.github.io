var catImage = document.getElementById("catImage");
    var catBreed = document.getElementById("catBreed");
    var catOrigin = document.getElementById("catOrigin");
    var catDescription = document.getElementById("catDescription");

    const searchBreed = async () => {
      const searchTerm = document.getElementById("searchBar").value.toLowerCase();

      // Fetch all cat breeds
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const breeds = await response.json();

      // Find the breed that matches the search term
      const breed = breeds.find(b => b.name.toLowerCase().includes(searchTerm));

      if (breed) {
        // Fetch an image of the breed
        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`);
        const imageData = await imageResponse.json();

        // Update UI with breed information
        catBreed.innerHTML = `Breed: ${breed.name}`;
        catOrigin.innerHTML = `Origin: ${breed.origin}`;
        catDescription.innerHTML = `Description: ${breed.description}`;
        catImage.src = imageData[0].url;
      } else {
        // Handle case when breed is not found
        catBreed.innerHTML = "Breed: Not Found";
        catOrigin.innerHTML = "Origin: Unknown";
        catDescription.innerHTML = "Description: No description available.";
        catImage.src = "";
      }
    }