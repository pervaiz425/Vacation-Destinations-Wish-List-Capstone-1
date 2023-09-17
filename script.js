"use strict";
const detailsForm = document.querySelector("#destination_details_form");
detailsForm.addEventListener("submit", handleFormSubmit);
console.log(detailsForm.length);

function handleFormSubmit(event) {
    event.preventDefault();
    const destName = event.target.elements["name"].value;  //accessing the form elements by name
    const destLocation = event.target.elements["location"].value;
    const destPhoto = event.target.elements["photo"].value;
    const destDesc = event.target.elements["description"].value;

    for (let i = 0; i < detailsForm.length; i++) {
        console.log(detailsForm[i]);
        detailsForm[i].value = "";
    }

    var destCard = createDestinationCard(destName, destLocation, destPhoto, destDesc);

    var wishListContainer = document.querySelector("#destinations_container");
    if (wishListContainer.children.length === 0) {
        document.getElementById("title").innerHTML = "My Wish List";
    }

    document.querySelector("#destinations_container").appendChild(destCard);
}
function createDestinationCard(name, location, PhotoURL, description) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.setAttribute("alt", name);

    const constPhotoURL = "images/signpost.jpg";

    function isValidURL(url) {
        // Regular expression for a valid URL pattern
        var urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}\/?([a-z0-9\-._~:/?#[\]@!$&'()*+,;=]*)$/i;

        // Test the URL against the pattern
        return urlPattern.test(url);
    }

    const isValid = isValidURL(PhotoURL);

    if (isValid) {
        img.setAttribute("src", PhotoURL);
    }
    else {
        img.setAttribute("src", constPhotoURL);
    }
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    const cardSubtitle = document.createElement("h4");
    cardSubtitle.innerText = location;
    cardBody.appendChild(cardSubtitle);

    if (description.length != 0) {
        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = description;
        cardBody.appendChild(cardText);
    }

    const cardDeleteButton = document.createElement("button");
    cardDeleteButton.innerText = "Remove";

    cardDeleteButton.addEventListener("click", removeDestination)
    cardBody.appendChild(cardDeleteButton);

    card.appendChild(cardBody);
    return card;
}

function removeDestination(event) {
    event.target.parentNode.parentNode.remove();
    //event.target is the button, parentNode is the cardBody, 
    // parentNode of cardBody is the card
}