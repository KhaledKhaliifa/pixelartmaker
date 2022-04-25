const sizePicker = document.querySelector('.size-picker');
const pixelCanvas = document.querySelector('.canvas');
const draw = document.querySelector('.drawBtn');
const fill = document.querySelector('.fillBtn');
const erase = document.querySelector('.eraseBtn');
const clearBtn = document.querySelector('.clear');
const exportBtn = document.querySelector('.export');
const eyeDropper = document.querySelector('.eyeDropper');
const showhide = document.querySelector('.showhide');

var state = "draw";

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
                if(state =="draw"){
                    var myColor = document.querySelector('.color-picker').value;
                    gridcell.style.backgroundColor = myColor;
                }
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
    if(state == "draw"){
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
}});

//Fill canvas function
fill.addEventListener('click',function(e){
    e.preventDefault();
    var response = confirm("Mota2akked yabni?");
    if(response){
        document.querySelectorAll('td').forEach(element => element.style.backgroundColor= document.querySelector('.color-picker').value);
    }
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
        state = "draw";
        if(state == "draw"){
            pressed = true;
            pixelCanvas.addEventListener('mouseup', function() {
                pressed = false;
            });
            pixelCanvas.addEventListener('mouseleave', function() {
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
}})});
clearBtn.addEventListener('click', function(e){
    e.preventDefault();
    var response = confirm("Mota2akked yabni?");
    if(response){
        document.querySelectorAll('td').forEach(element => element.style.backgroundColor= null);
    }
});
eyeDropper.addEventListener('click', function(e){

    state="eye";
    e.preventDefault();
    pixelCanvas.addEventListener('click',function(e){
        if(e.target.tagName.toLowerCase() === 'td'){
            if(e.target.style.backgroundColor){
                let mycolor = e.target.style.backgroundColor;
                console.log(mycolor);
                var rgb = mycolor.replace(/^rgba?\(|\s+|\)$/g,'').split(',');
                console.log(rgb);
                for(var i =0;i<rgb.length;i++){
                    rgb[i]= Number(rgb[i]);
                }
                for(var i =0;i<rgb.length;i++){
                    rgb[i] = rgb[i].toString(16);
                }
                for(var i = 0;i<rgb.length;i++){
                    if(rgb[i].length == 1){
                        rgb[i]="0"+rgb[i];
                    }
                }
                console.log(rgb);
                final = `#${rgb[0]}${rgb[1]}${rgb[2]}`;
                console.log(final);
                document.querySelector('.color-picker').value = final;
            }
        }
        
    })
})
let shown = true;
showhide.addEventListener('click', function(){
    if(shown){
        document.querySelectorAll('td').forEach(element => element.style.border= "1px dotted silver");
        shown = false;
    }
    else{
        document.querySelectorAll('td').forEach(element => element.style.border= "none");
        shown=true;
    }
})