var n ; 
var m ; 

var visited=[]; 
 
var result=[]; 

var COUNT; 

function is_valid( x,  y, key, input) 
{ 	
	if (x < n && y < m && x >= 0 && y >= 0) { 
		if (visited[x][y] == false && input[x][y] == key) 
			return true; 
		else
			return false; 
	} 
	else
		return false; 
} 

// BFS to find all cells in 
// connection with key = input[i][j] 
function BFS(x, y, i,  j,  input,cou) 
{ 	//console.log("cou",cou);
	// terminating case for BFS 
	if (x != y) 
		return; 

	visited[i][j] = 1; 
	COUNT++; 

	// x_move and y_move arrays 
	// are the possible movements 
	// in x or y direction 
	var x_move = [ 0, 0, 1, -1 ]; 
	var y_move = [ 1, -1, 0, 0 ]; 

	// checks all four points connected with input[i][j] 
	for (var u = 0; u < 4; u++) {
		if (is_valid(i + y_move[u], j + x_move[u], x, input)){ 
			BFS(x, y, i + y_move[u], j + x_move[u], input,cou); 
		}
	}
} 

// called every time before a BFS 
// so that visited array is reset to zero 
function reset_visited() 
{ 
	for (var i = 0; i < n; i++) 
		for (var j = 0; j < m; j++) 
			visited[i][j] = 0; 
} 

// If a larger connected component 
// is found this function is called 
// to store information about that component. 
function reset_result( key, input) 
{ 
	for (var i = 0; i < n; i++) { 
		for (var j = 0; j < m; j++) { 
			if (visited[i][j] && input[i][j] == key) 
				result[i][j] = visited[i][j]; 
			else
				result[i][j] = 0; 
		} 
	}
	//console.log(result); 
} 
// function to print the result 
function print_result( res) 
{ 
	//cout << "The largest connected "
	//	<< "component of the grid is :" << res << "\n"; 

	// prints the largest component 
	/*for (int i = 0; i < n; i++) { 
		for (int j = 0; j < m; j++) { 
			if (result[i][j]) 
				cout << result[i][j] << " "; 
			else
				cout << ". "; 
		} 
		cout << "\n"; 
	} */
	console.log(res);
	console.log(result);
} 

// function to calculate the largest connected 
// component 
function computeLargestConnectedGrid( input) 
{ 
	var current_max = -2; 
//	console.log(input);
	cou=0;
	for (var i = 0; i < n; i++) { 
		for (var j = 0; j < m; j++) { 
			reset_visited();		 
			COUNT = 0;
			
			cou++;
			
			// checking cell to the right 
			if (j + 1 < m) 
				BFS(input[i][j], input[i][j + 1], i, j, input,cou); 

			// updating result 
			if (COUNT >= current_max) { 
				current_max = COUNT; 
				reset_result(input[i][j], input); 
			} 
			
		//	console.log("i",i);
		//	console.log("j",j);
		//	console.log("icnt",COUNT);
			
			reset_visited(); 
			COUNT = 0; 

			// checking cell downwards 
			if (i + 1 < n) 
				BFS(input[i][j], input[i + 1][j], i, j, input,cou); 

			// updating result 
			if (COUNT >= current_max) { 
				current_max = COUNT; 
				reset_result(input[i][j], input); 
			} 
		} 
	} 
	print_result(current_max); 
} 
// Drivers Code 
 /*	var input = [
		[2,2],
		[2,2]
	];
	var input = 	  [ [ 1, 4, 4, 4, 4, 4, 4, 4 ], 
						[ 2, 1, 1, 4, 4, 4, 4, 1 ], 
						[ 3, 2, 1, 1, 2, 3, 2, 1 ], 
						[ 3, 3, 2, 1, 2, 2, 2, 2 ], 
						[ 3, 1, 3, 1, 1, 4, 4, 4 ], 
						[ 1, 1, 3, 1, 1, 4, 4, 4 ] ]; 
*/	
	// function to compute the largest 
	// connected component in the grid 
	//computeLargestConnectedGrid(input); 



var indx=document.getElementById("id");
var src1='./red.jpg';
var src2='./blue.png';
var src3='./green.png';
var src4='./yellow.jpeg'

var nn;
var arr=[];

function fn1(){

    nn=document.getElementById("number").value;
    nn=parseInt(nn);

    n=nn;
    m=nn;
    
    for(var i=0;i<n;i++){
        visited[i]=[];
        result[i]=[];
    }

    indx.innerHTML="";
    
    for(var i=0;i<nn;i++){
        arr[i]=[];
        for(var j=0;j<nn;j++){
            arr[i][j]=(Math.floor(Math.random() * 99))%3;
        }   
    }

    for( i=0;i<nn;i++){
    
        var tag= document.createElement('div');
        //tag.className='1';
        for( j=0;j<nn;j++){
            var tag2=document.createElement('img');
            if(arr[i][j]==0)
            tag2.src=src1;
            else if(arr[i][j]==1)
                tag2.src=src2;
            else tag2.src=src3;
            tag2.style.width='100px';
            tag2.style.height='100px';
            tag2.style.margin='5px'
            var num=i*(nn)+j;
            tag2.id=num.toString();
            tag.appendChild(tag2);
        
        //console.log('id',tag2.id);
        
    }
    indx.appendChild(tag);
    }
}

function find(){
    computeLargestConnectedGrid(arr);
    console.log(result);

    for( i=0;i<nn;i++){
        for( j=0;j<nn;j++){
            if(result[i][j]==1){
            var num=i*nn+j;
            var img=document.getElementById(num.toString());
            img.src=src4;}

           }    
    }
}

//console.log(result)

