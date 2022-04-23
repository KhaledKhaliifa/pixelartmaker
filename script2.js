
const sizePicker = document.querySelector('.size-picker');
const pixelCanvas = document.querySelector('.canvas');
const draw = document.querySelector('.drawBtn');
const fill = document.querySelector('.fillBtn');
const erase = document.querySelector('.eraseBtn');
const clearBtn = document.querySelector('.clear');
const exportBtn = document.querySelector('.export');

//Function that creates the grid, first call takes the origianl values of height and width (25,25)
function makeGrid(){
    const height = document.querySelector('.height').value;
    const width = document.querySelector('.width').value;


    while (pixelCanvas.firstChild) {
        pixelCanvas.removeChild(pixelCanvas.firstChild);
    }
    for (let i = 0; i < height; i++) {
        let gridrow = document.createElement('tr');
        for (let j = 0; j < width; j++) {
            let gridcell = document.createElement('td');
            
            gridcell.addEventListener('mousedown',function() {
                var myColor = document.querySelector('.color-picker').value;
                gridcell.style.backgroundColor = myColor;
            });
            gridrow.appendChild(gridcell);
        }
        pixelCanvas.appendChild(gridrow);
    }  
    

}
makeGrid();

//Call makegrid whenever we click on submit
sizePicker.addEventListener('submit', function(event){
    event.preventDefault();
    makeGrid();

});

let pressed = false;

//Drag draw on the canvas possiblity
pixelCanvas.addEventListener('mousedown', function(event){
    pressed = true;
	pixelCanvas.addEventListener('mouseup', function() {
		pressed = false;
	});
    pixelCanvas.addEventListener('mouseleave', function() {
        pressed = false;
    });
 
    pixelCanvas.addEventListener('mouseover', function(e) {

  	if (pressed) {
      if (e.target.tagName.toLowerCase() === 'td') {
      	e.target.style.backgroundColor = document.querySelector('.color-picker').value;
      }
    }
  });
});

//Fill canvas function
fill.addEventListener('click',function(e){
    e.preventDefault();
    document.querySelectorAll('td').forEach(element => element.style.backgroundColor= document.querySelector('.color-picker').value);

});


//Erase button function
erase.addEventListener('click',function(e){
    pixelCanvas.addEventListener('mousedown', function(event){
        pressed = true;
        pixelCanvas.addEventListener('mouseup', function() {
            pressed = false;
        });
        pixelCanvas.addEventListener('mouseleave', function() {
            pressed = false;
        });
     
        pixelCanvas.addEventListener('mouseover', function(e) {
    
          if (pressed) {
          if (e.target.tagName.toLowerCase() === 'td') {
              e.target.style.backgroundColor = null;
          }
        }
      });
    });
});

//Draw button function
draw.addEventListener('click', function(e){
    pixelCanvas.addEventListener('mousedown', function(event){
        pressed = true;
        pixelCanvas.addEventListener('mouseup', function() {
            pressed = false;
        });
        // Ensures cells won't be colored if grid is left while pointer is held down
        pixelCanvas.addEventListener('mouseleave', function() {
            pressed = false;
        });
     
        pixelCanvas.addEventListener('mouseover', function(e) {
    
          if (pressed) {
          // 'TD' capitalized because element.tagName returns upper case for DOM trees that represent HTML elements
          if (e.target.tagName.toLowerCase() === 'td') {
              e.target.style.backgroundColor = document.querySelector('.color-picker').value;
          }
        }
      });
    });
});
clearBtn.addEventListener('click', function(e){
    e.preventDefault();
    var response = confirm("Are you sure ?");
    if(response){
        document.querySelectorAll('td').forEach(element => element.style.backgroundColor= null);
    }
});

