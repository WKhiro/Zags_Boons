# Zag's Boons [![Netlify Status](https://api.netlify.com/api/v1/badges/0300e418-fa44-42cb-83ba-cea2ef86e58f/deploy-status)](https://app.netlify.com/sites/zagsboons/deploys)

[Website Link](https://zagsboons.netlify.app/)

Hades WAS an early access game by SuperGiant Games. The game features power-ups known as "boons", and some of the special boons required other boons as "prerequisites". This web application is meant to provide the user an easy way to view all the special boons that branch out of each prerequisite boon. This project utilizes a self-made JSON file containing all the gods and their respective boons. This data is then queried as needed using GraphQL.

Unfortunately, a similar (abit less cool looking) feature was added upon the full game's release in the Codex. In hindsight, I also should've just made my own API instead of creating a JSON file like a madman.

## Work in Progress
Currently still needs the following:
- CSS styling
- Hermes? (Special case that actually has a boon that builds out of a trinket)
- Duo/Legendary boons page
- Select any boon page
