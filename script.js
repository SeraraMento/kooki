function validateForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;
    
    if (!name || !email || !password) {
        alert('Tous les champs doivent être remplis.');
        return false;
    }
    
    if (!terms) {
        alert('Vous devez accepter les termes et conditions.');
        return false;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('L\'email doit contenir un @ et un .');
        return false;
    }
    
    if (password.length < 8) {
        alert('Le mot de passe doit contenir au moins 8 caractères.');
        return false;
    }
    
    alert('Formulaire validé avec succès !');
    document.getElementById('userForm').reset();
}

document.getElementById('userForm').addEventListener('submit', validateForm);