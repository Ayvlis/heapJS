$(document).ready(function() {

	$("#add").focus();
 
	var counter = 0; // number of elements in the array


	$("#add").keypress(function (e) {
		$('.hint').fadeOut();
		var key = e.which; //save in key the key code of the key pressed
 		if(key == 13)  { // the enter key code
 			
 			var number = parseInt($("#add").val()); 
 			$("#add").val("");	
 			
 			if(number>99 || isNaN(number)) { //if the input is wrong

 				$('.hint').fadeIn("slow");

 			} else {
 				counter++;
 				$(".array").append('<p class="element">'+number+'</p>');


 				if(counter==1) { //if there is at least one element in the array show the buttons
 					$(".make-tree").removeClass('invisible');
 					$(".build-heap").removeClass('invisible');
 				}
 			}
 			return false;  
 		}
 	}); 


	$(".make-tree").click(function() {

		$(".page1").addClass('invisible');

		var nodes = arrayFrom(".array", "p"); //all the elements inserted by the user goes here

		buildTree(nodes); //visualizing the tree
    
  });


	$(".build-heap").click(function() {
		
    $(".page1").addClass('invisible');

		var heaptree = new heap(arrayFrom(".array", "p")); //build a heap from the list of elements inserted by the user

		buildTree(heaptree.heap); //visualize the heap
    
	});


	function arrayFrom(parent, child) {
		
    var array = [];
		for (var i = counter-1; i >= 0; i--) {
			var element = parent+" "+ child + ":nth-child("+(i+1)+")";
			array[i]=$(element).text();
		}
    
    $(parent).empty();

		return array;
	
  }
  
  
  function buildTree(array) {
   
    for (var i = 1; i<=array.length; i++) { 
			var log = Math.floor(Math.log(i)/Math.LN2);
			var row = ".row-"+log;
			$(row).append('<div class="spot"><p class="element" id="node-'+i+'"">'+array[i-1]+'</p></div>');
			
      if(array.length>1) {
				var parent = "#node-"+Math.floor(i/2);
				var me = "#node-"+i;

				$(me).connections({to: parent, within:".rows"});

			}
    }
    
    $('.element').connections('update');
  
  }


	function heap(array) {
		this.heapsize = array.length;
		this.root = array[0];

		this.heap = array;
		buildHeap(this);
	}


	function buildHeap(heap) {
		for (var i=Math.floor(heap.heapsize/2); i>=1; i--) {
			console.log(i);			
			heapify(heap, i-1);
		}
	}


	function heapify(heap, i) {
		var m;
		
		if(left(i)<=heap.heapsize-1 && heap.heap[left(i)]>heap.heap[i]) {
			m = left(i);
		} else {
			m = i;
		}

		if(right(i)<=heap.heapsize-1 && heap.heap[right(i)]>heap.heap[m]) {
			m = right(i);
		}

		if(m!=i) {
			console.log(heap.heap[m] + " " +  heap.heap[i] );
			swap(heap.heap, i, m);
			heapify(heap, m);
		}
	}


	function swap(array, i, m) {
		var temp = array[i];
		array[i] = array[m];
		array[m] = temp;
	}


	function left(i) {
		return 2*i+1;
	}


	function right(i) {
		return 2*i+2;
	}


	function parent(i) {
		return i/2;
	}





}); 
