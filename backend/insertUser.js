// insertUser.js
const mongoose = require('mongoose');
const User = require('./models/User'); // Assurez-vous que le chemin est correct

// Connexion à la base de données "auth"
mongoose.connect('mongodb://localhost:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connecté à MongoDB dans la base 'auth'");

  // Création d'un nouvel utilisateur
  const newUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',  // Pensez à hasher le mot de passe en production
      phoneNumber: '123-456-7890', // Added phone number
      avatar: 'http://exemple.com/avatar.jpg'
      // Le champ "date" est automatiquement défini par default: Date.now
  });

  // Sauvegarde de l'utilisateur dans la collection "users"
  return newUser.save();
})
.then(user => {
  console.log("Utilisateur inséré dans la collection 'users' :", user);
  mongoose.connection.close(); // Fermeture de la connexion une fois terminé
})
.catch(err => {
  console.error("Erreur lors de l'insertion :", err);
  mongoose.connection.close();
});