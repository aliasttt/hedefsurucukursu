// Fetch contact information from contact.json and update the DOM
fetch('/contact.json')
  .then(response => response.json())
  .then(data => {
    // Update footer contact info
    const footerAddress = document.querySelector('footer .col-md-4 p:first-child');
    if (footerAddress) {
      footerAddress.innerHTML = data.address;
    }
    const footerContact = document.querySelector('footer .col-md-4 p:nth-child(2)');
    if (footerContact) {
      footerContact.innerHTML = `Tel: ${data.phone}<br>E-posta: ${data.email}`;
    }
    // Update contact page info
    const contactAddress = document.querySelector('.contact-section .col-md-6 .card-body .d-flex:nth-child(1) div p');
    if (contactAddress) {
      contactAddress.innerHTML = data.address;
    }
    const contactPhone = document.querySelector('.contact-section .col-md-6 .card-body .d-flex:nth-child(2) div p');
    if (contactPhone) {
      contactPhone.innerHTML = data.phone;
    }
    const contactEmail = document.querySelector('.contact-section .col-md-6 .card-body .d-flex:nth-child(3) div p');
    if (contactEmail) {
      contactEmail.innerHTML = data.email;
    }
  })
  .catch(error => console.error('Error loading contact information:', error)); 