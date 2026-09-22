  

# Goodreads


Goodreads appen är en inlämningsuppgift i kursern Javascript 2 på Grit Academy där appen skulle skapas med hjälp av Firebase Realtime Database.

Avändaren kan lägga till böcker genom formuläret och fylla i booktitel och författare. Böckerna kan sedan markeras som lästa eller tas bort. När en bok markeras som läst kan användaren betygsätta boken.


## Kodstruktur

src/main.js Applikationens startpunkt. Filen som samordnar kommunikationen genom att länka formuläret med dess funktioner.

src/modules/Book.js Bokklassen som är en mall för vilka egenskaper som varje bok ska innehålla. Innehåller även metoder för att PATCH och radera böcker.

src/modules/firebaserequests.js Hämtar och lägger till böcker.

src/modules/renderbookcard.js renderar allt innehåll som syns på sidan.
#
## Resurser

Firebase RealtimeDatabase: https://firebase.google.com/
#
## Uppstart av applikationen

Applikationen kan startas genom att köra med Vite eller genom länken från Netlify:
https://goodreads-tatiana-uzan.netlify.app/
