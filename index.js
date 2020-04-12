/*  
	Code for finding longest Chain of identical color in a grid.
	Uses DFS Traversal for each node and finds the node farthest from current node.
	Creates a random Grid and applies the methods for finding longest chain. 

*/

//result stores the final path grid 
var indx=document.getElementById("id");
var src1='./red.jpg';
var src2='./blue.png';
var src3='./green.png';
var src4='./yellow.jpeg'

var COUNT;
var node_i,node_j;
var n;

var visited=[];
var result=[]; 
var distance=[];
var path=[];

var nn;
var arr=[];

// DFS to find current connected chain   
function DFS( x, y, i, j, input) 
{ 
    var x_move = [ 0, 0, 1, -1 ]; 
    var y_move = [ 1, -1, 0, 0 ]; 
    
    visited[i][j] = 1; 
    if(distance[i][j]>COUNT){
    node_i=i;node_j=j;
    COUNT=distance[i][j];
    }
    for (var u = 0; u < 4; u++) 
        if (is_valid(i + y_move[u], j + x_move[u], x, input)){ 
            distance[i + y_move[u]][j + x_move[u]]=distance[i][j]+1;
            DFS(x, y, i + y_move[u], j + x_move[u], input);
        }
    
}

// Function checks if a cell is valid 
function is_valid( x, y, key, input) 
{ 
    if (x < n && y < n && x >= 0 && y >= 0) { 
        if (visited[x][y] == false && input[x][y] == key) 
            return true; 
        else
            return false; 
    } 
    else
        return false; 
} 

//Function for setting vis and dis values to null for reuse  
function reset_visited() 
{ 
    for (var i = 0; i < n; i++) 
        for (var j = 0; j < n; j++){ 
            visited[i][j] = 0;
            distance[i][j]=0;
        }    
} 

//Function for storing longest chain found till now
function reset_result( key, input) 
{ 
    for (var i = 0; i < n; i++) { 
        for (var j = 0; j < n; j++) { 
            if (visited[i][j] && input[i][j] == key) 
                result[i][j] = distance[i][j]; 
            else
                result[i][j] = 0; 
        } 
    } 
} 
//Longest chain in grid form
function makeGrid( maxx, x, y){
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            path[i][j]=0;
        }
    }
    
    while(maxx!=0){
        path[x][y]=1;

        maxx--;
        if(x-1>=0 && result[x-1][y]==maxx){
            x--;
        }else if(x+1<n && result[x+1][y]==maxx){
            x++;
        }else if(y-1>=0 && result[x][y-1]==maxx){
            y--;
        }else{
            y++;
        }
    }
    //path[x][y]=1; 
}

//Function to calculate the longest chain 
function computeLargestConnectedChain( input) 
{ 
    var current_max = 0,current_i,current_j; 
  
    for (var i = 0; i < n; i++) { 
        for (var j = 0; j < n; j++) { 
            reset_visited(); 
            COUNT = 0; 
         
            if (j + 1 < n){ 
                distance[i][j]=1;
                DFS(input[i][j], input[i][j + 1], i, j, input);
            } 
 
            if (COUNT > current_max) { 
                current_max = COUNT; 
                current_i=node_i;current_j=node_j;
                reset_result(input[i][j], input);
                
            } 
            reset_visited(); 
            COUNT = 0; 
  
            if (i + 1 < n){ 
                distance[i][j]=1;
                DFS(input[i][j], input[i+1][j], i, j, input);
            } 

            if (COUNT > current_max) { 
                current_max = COUNT; 
                current_i=node_i;current_j=node_j;
                reset_result(input[i][j], input);
                
            }
            
        } 
    } 
    makeGrid(current_max, current_i, current_j);
}   

//Function for creating grid.
//Use random() for creating a random array(arr) of numbers between 0 & 3
//Sets a colored image acc to the scheme 0 -> red | 1 -> blue | 2 -> green
function createGrid(){

    nn=document.getElementById("number").value;
    nn=parseInt(nn);

    n=nn;
    
    for(var i=0;i<n;i++){
		visited[i]=[];
		result[i]=[];
		distance[i]=[];
		path[i]=[];
	}

    indx.innerHTML="";
    
    for(var i=0;i<n;i++){
        arr[i]=[];
        for(var j=0;j<n;j++){
            arr[i][j]=(Math.floor(Math.random() * 99))%3;
        }   
    }

    for( i=0;i<n;i++){
    
        var tag= document.createElement('div');
        //tag.className='1';
        for( j=0;j<n;j++){
            var tag2=document.createElement('img');
			
			if(arr[i][j]==0)
            	tag2.src=src1;
            else if(arr[i][j]==1)
                tag2.src=src2;
			else 
				tag2.src=src3;
			
			tag2.style.width='100px';
            tag2.style.height='100px';
            tag2.style.margin='5px'
            var num=i*(n)+j;
            tag2.id=num.toString();
            tag.appendChild(tag2);
        
        //console.log('id',tag2.id);
        
    }
    indx.appendChild(tag);
    }
}
//Function for longest chain
//Compare values of array path.
//Gets the img with id = i*n + j and replace its image with yellow color image.
function find(){
    computeLargestConnectedChain(arr);
    console.log(path);

    for( i=0;i<n;i++){
        for( j=0;j<n;j++){
            if(path[i][j]==1){
            var num=i*nn+j;
            var img=document.getElementById(num.toString());
            img.src=src4;}

           }    
    }
}


