# Marvel Wikia

A web site using the Marvel API, based on Express HBS. This is the 2nd of the three projects of the IronHack WebDev Bootcamp (fall 2022).
In this web site, you can search and find any Marvel character (data provided by Marvel). The user type the request in the search bar and get the results: name of the character, image, description and comics related. He can add his beloved characters in his favorite page. To do so, he must sign up and login. In the profile page, the user can update his profile picture and password.

# DEMO

https://marvel-wikia.onrender.com/

# About implementation

- 3 schema models: Character, FavCharacter, User.
- 1 seed in order to fetch the data from the Marvel API.
- 1 route to create a user.
- 1 route to search characters in the Mongo database.
- 1 route to update the user.
- 1 route to add a character to the favorites.
- 1 route to delete a character from the favorites.
- Use of Cloudinary to store the user's profile pictures.
- Use of bcrypt to hash and protect users passwords.

# Possible improvements

- Using DOM manipulations to display on click the charcaters informations.
- Implementing the possibility to search also for comics.
- Adding links to purchase the comics.
- Adding an admin to delete the users accounts.
- Adding a media query in order to display the site correctly on smartphones and small screens.
