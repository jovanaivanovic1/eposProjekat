  
document.addEventListener('DOMContentLoaded', function() {
    var hamburger = document.querySelector('.hamburger-menu');
    var nav = document.querySelector('header nav');

    hamburger.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });


    var form = document.getElementById('ratingForm');
    var commentsDiv = document.getElementById('comments');

    form.onsubmit = function(event) {
        event.preventDefault(); 
        
        var name = document.getElementById('name').value;
        var comment = document.getElementById('comment').value;
        var rating = document.querySelector('input[name="rating"]:checked').value;
        var commentEntry = document.createElement('div');

        commentEntry.innerHTML = '<strong>' + name + '</strong> - ' + rating + ' stars (' +     comment +')' ;
        commentsDiv.appendChild(commentEntry);
        var rating = document.querySelector('input[name="rating"]:checked').value; 

        
        updateAverageRating(rating);
        form.reset();
    };
});

function updateAverageRating(newRating) {
  
    var ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratings.push(parseInt(newRating));
    localStorage.setItem('ratings', JSON.stringify(ratings));

    var sum = ratings.reduce((a, b) => a + b, 0);
    var average = sum / ratings.length;

    document.getElementById('avgRatingValue').textContent = average.toFixed(1);
}
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    var verification = document.getElementById('verification').value.trim();

    // Provera imena
    if(name === "") {
        alert("Molimo unesite vaše ime.");
        return;
    }

    // Provera email-a
    if(!validateEmail(email)) {
        alert("Molimo unesite validnu email adresu.");
        return;
    }

    // Provera telefona (opciono)
    if(phone !== "" && !validatePhone(phone)) {
        alert("Molimo unesite validan broj telefona.");
        return;
    }

    // Provera verifikacije
    if(verification !== "7") {
        alert("Pogrešan odgovor na verifikaciono pitanje.");
        return;
    }

    // Prikaži unete podatke u alertu
    alert("Ime: " + name + "\nEmail: " + email + "\nTelefon: " + phone + "\nNaslov: " + subject + "\nPoruka: " + message);

 

    // Resetuj formu nakon slanja
    document.getElementById('contact-form').reset();
});


function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^[+]?[0-9]{10,13}$/;
    return re.test(phone);
}
 


 



function searchToys() {
    var input, filter, cards, cardContainer, h3, title, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementsByClassName("toy-cards-container")[0];
    cards = cardContainer.getElementsByClassName("toy-card");

    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".toy-card .toy-info .toy-title");
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}

function sortToys() {
    var container = document.querySelector('.toy-cards-container');
    var toys = Array.from(container.getElementsByClassName('toy-card'));
    var sortBy = document.getElementById('sortPrice').value;

    toys.sort(function(a, b) {
        var priceA = parseInt(a.querySelector('.toy-title').innerText.match(/(\d+)/)[0]); 
        var priceB = parseInt(b.querySelector('.toy-title').innerText.match(/(\d+)/)[0]);

        if (sortBy === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    toys.forEach(function(toy) {
        container.appendChild(toy);
    });
}


