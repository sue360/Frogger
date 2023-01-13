# Frogger
A project to create my first arcade game



ReadMe - GA Project One: Frogger - 6 days

Description

I created this game as my first project for General Assembly’s software engineering immersive course. The project brief was to build a simple game integrating learning on the course so far, including JavaScript arrays, loops, functions, CSS and more.

I chose to build Frogger, a classic arcade game of avoiding obstacles and racing against a countdown timer to reach safety. I chose to build this game as it includes auto generated obstacles and offered the chance to practise working with timers in JavaScript. I will discuss the process, results, and key takeaways below.

Deployment link: https://sue360.github.io/Frogger/

To access the final game and code, please follow the link above. You will need to login to GitHub to access the full project.

Timeframe & Working Team

This was a solo project, my first major project working independently. I spent five days (excluding initial planning) completing this project.

Technologies Used

JavaScript
CSS
HTML

Brief

The project brief set out necessary features the final game needed to include, to serve as a minimum viable product (MVP). Beyond this, there were ways to enhance the gameplay experience, and to make the game more challenging, immersive and complex.

I’ve included snippets from the core brief below:

The idea of Frogger is to guide a family of frogs across a road, and a river to their homes at the top of the screen.
 
To make things more challenging there are numerous moving obstacles that the frogs must avoid to reach their destination.


 
## Requirements
 
* The game should be playable for one player.
* The obstacles should be auto generated.

Planning

Though I was keen to get started, particularly on the CSS, to see how the design ideas I’d visualised really looked on my screen, taking time beforehand helped greatly. Planning allowed me to think through the different stages of the build process I would need to budget time for. I had only 5 days to build this game, so every hour had to count. 

I started by setting up a system to keep track of key tasks. For this I made use of a Trello board to break the stages of my project into clear and manageable tasks, and to keep track of it all. During the build stage, this was particularly useful at the start of each day, to recall the progress I had made, and consider priorities for the day ahead. 

![trello_proj_one](https://user-images.githubusercontent.com/113911812/212373122-3359b72d-537d-4279-a85f-23efce62d550.png)

With a simple Trello board set up, I then used an online whiteboard to draw a mock up, 
and annotated it with a plan for how to structure the underlying HTML. This did not take long, although working out the logic for the JavaScript to animate the game (pseudo coding) proved more demanding. For this part, I wrote notes in VS code and commented them out. I made use of notes I had taken throughout the course so far, and referred to other (simpler) projects we had explored through classes. I wanted to have all relevant notes together in one place, and started out following a structure of setting out the Elements, Variables, Events, and Executions, to make sure all aspects of the game’s functionality were covered. Throughout, I updated my Trello board with new tasks.

![wireframe_proj_one](https://user-images.githubusercontent.com/113911812/212373696-a7cfed1e-30f8-420d-b8b7-6fc7ea57b812.png)

Trello proved to be a useful tool for organisation. I kept the detail high level here, to prevent this from becoming overcrowded and difficult to navigate or manage. I set my board up to remind me with prompts and brief summaries of what I needed to focus on next, as well as to keep track of progress I had already made.

Build

The grid was the most central element of the game. A grid would represent the game world - the background and context for moving obstacles which Froggo would need to avoid. To keep my code as clear and non repetitive as possible, I decided to build the grid by appending cells to a div using JavaScript - through the DOM. I started the build by setting up a basic HTML structure, including a heading, and various divs which I could use to section off the page with CSS styling. The snippet below is from the section of my HTML where the grid cells were to be injected. I kept a note in to remind myself - and make clear - why this div appeared to have no children in the HTML.

 <div class="grid-wrapper">
     <div class="grid">
       <!-- Elements will be injected here using JS -->
 
     </div>
   </div>
 </body>
</html>

Next, I added basic CSS styling to the sections set up in HTML. This was an enjoyable and straightforward part of the process, and it was satisfying to see the page start to look like a game website. Next, I built the grid by setting the width and length, and appending cells to the grid div.

I updated my CSS styling with properties that would be assigned to cells created through JavaScript. The code snippet below shows some of the properties that I applied to grid cells. I had used this method to set up a grid before, but here I customised it by using much smaller cells and different features (background colours to create a busy road and a river)  for different parts of the grid. I applied styling (to create a nostalgic theme as a tribute to the original game) dynamically to different sections of the grid using CSS classes by assigning background colours in the code which created the grid. This involved using arrays, and assigning CSS classes to grids based on the array they fell into, or the index number that applied to them. This part of the build process took some time to figure out, and I experienced a few setbacks with bugs along the way. 

.grid div {
 flex-grow: 1;
 height: 2%;
 width: 2%;
}
 
.grid div.frog {
 background-image: url('../assets/Froggo.jpg');
 background-repeat: no-repeat;
 background-size: contain;
 cursor: pointer;
}

Through a similar process, I added the image of a frog to the grid, and used the DOM (event listeners for keydown) to allow the frog to move when the user pressed the arrow keys. The image below shows the final grid, as well as the cell that currently has the class (and therefore background image) of the frog.

![frogger_screenshot](https://user-images.githubusercontent.com/113911812/212374458-4a348ff1-63f2-4793-9c84-54b9f5b9b861.png)

Another key part of the build phase was setting the obstacles moving. To do this I used arrays again, and CSS classes which were added and removed to/from cells within each array at intervals set to a timer (looping through arrays). The code snippet below shows an example of this. I then created a function to contain all the moving obstacles, which allowed me to set all these obstacles moving at once with more concise code. It also made it clear to see where I might add in further obstacles, given more time to develop the game.


function moveObstacles(){
 moveBus()
 moveTram()
 moveGators()
 moveSharks()
 moveLobsters()
 //add in any other moving obstacles here :D
}
 
function moveBus(){
 busInterval = setInterval(() => {
   //remove bus class
   busPositions.forEach(position => {
     cells[position].classList.remove('bus')
   })

   busPositions.forEach((position, index) => {
     if(position % width !== width - 1){
       busPositions[index]++
     } else{
       busPositions[index] = busPositions[index] - width + 1
     }
   })
 
   //add bus class
   busPositions.forEach(position => {
     cells[position].classList.add('bus')
   })
 
   //checking if bus hits froggo
   busPositions.forEach(position => {
     if (cells[position].classList.contains('frog')){
       loseLife()
     }
   })
 } , 300 )
 
 As in the code snippet below, looking out for collisions was an important feature to build into the moving obstacles. This took some time to figure out. I tested out different approaches by changing whether or not the functions that moved obstacles included logic that looked for the frog class. I found that when both the frog’s movement and the moving obstacles included logic that looked out for moments when cells contained both the frog class and the class that applied to moving obstacles (e.g. .gator), the game worked as intended.
 
 function frogCollisions(){
   if ((cells[currentPosition].classList.contains('goal')) && (parseInt(timer.innerHTML) > 0)){
     winGame()
   }
   if (!(cells[currentPosition].classList.contains('goal')) && (parseInt(timer.innerHTML) === 0)){
     loseLife()
   }

 Challenges


Assigning grid cells classes (to style them, and to set obstacles in motion based with succinct JavaScript) - this proved more complicated than I had anticipated. Planning out my approach in more detail with more time and precision on pseudo coding would have saved me stress and time.
Fixing bugs! - unexpected bugs slowed me down early on - but I soon learned to look out for common mistakes, and to take more care when moving chunks of code as it was easy to lose parentheses on the way
Getting lost in my code - I learned the importance of sticking to a clear structure when I got lost in a very long function. Although it cost me time, I learned the importance of keeping code clean and deleting notes and test console.logs along the way.
I also realised too far into the process to change it, that using tiny grid cells would cost me more time. I had originally planned to use small grid cells because I expected it would make the movement of obstacles appear more natural and smooth. While the movement did look convincing, it limited my styling options and made the grid more difficult to work with.

Wins

Visual design (CSS) - although I kept my design simple, I was impressed at how straightforward this aspect of the design was, as I had found CSS fiddly  in the past.
Improved my understanding of how arrays can prove useful in keeping code DRY (avoiding repetition).
Gained more experience in working with the DOM - it was satisfying to see everything connect!

 Key Learnings/Takeaways

Improved understanding of how to work with arrays.
Confidence boost on CSS - as this proved to be the most straightforward aspect of building the game.
Gained more experience in project management.
The importance of clean and DRY code, and of maintaining a good structure from start to finish.

Bugs

It is possible to move the frog at the very beginning of the game before clicking start. The obstacles only start moving upon clicking start, so it is possible to cheat by moving the frog up the board before pressing start and setting the obstacles moving, however this is against the spirit of the game.

Future Improvements

I could improve my simple game by adding more levels.
I also wanted to include a ‘Game Over’ page.
I could improve the CSS/aesthetics and add music to make the game more immersive. 
 
 
 
 







