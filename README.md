Memory-Game
===========
Assignment - a simple memory game

At the start of the application, load the "words.json" file (see bottom of this document) using AJAX.
Generate a random number between 6 and 12. Say, N.
Load N entries from the json data (random or sequential) into an array.

Display 2xN opaque tiles in a 3 column grid. The image or the phrase associated with the image should not be visible.
E.g. If the returned data contains 7 images+phrase pairs then, you'll display 14 opaque tiles in 3 columns 
and 5 rows (last row will have only 2 tiles). If the returned data contains 6 images+phrase pairs then, you'll 
display 12 opaque tiles in 3 columns and 4 rows.

When you tap on one of the tiles, display the corresponding image in place of the tile. Keep displaying this 
image until second tile is tapped.
When the user taps on another tile, display the corresponding image as before.

 - If this tile matches with the previously opened tile, then remove those two tiles and show a simple message 'Matching Tiles 
Removed’.
 - If this tile does not match the previous tile, hide both the images with opaque tiles after a short delay and 
show a message 'Tiles Do Not Match’.
 - Continue this process until the user matches all the tiles. Then show a success message.

If the user presses the Play Again button, then start all over again.
