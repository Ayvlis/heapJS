$(document).ready(function() {

	$(".page1").addClass('visible-block');

	$(".hint").fadeOut('fast');

	$("#add").focus();

	var counter = 0;

	$("#add").keypress(function (e) {
		$('.hint').fadeOut();
		var key = e.which;
 		if(key == 13)  { // the enter key code
 			
 			var number = parseInt($("#add").val());
 			$("#add").val("");	
 			
 			if(number>99 || isNaN(number)) {

 				$('.hint').fadeIn("slow");
 				$('.hint').css("display", "inline");

 			} else {
 				counter++;
 				var log = Math.floor(Math.log(counter)/Math.LN2);
 				var row = ".row-"+log;
 				$(".array").append('<p class="element">'+number+'</p>');


 				if(counter==1) {
 					$(".make-tree").removeClass('invisible');
 					$(".build-heap").removeClass('invisible');
 				}
 			}
 			return false;  
 		}
 	}); 

	$(".make-tree").click(function() {
		var nodes = [];
		for (var i = counter-1; i >= 0; i--) {
			var node = ".array p:nth-child("+(i+1)+")";
			nodes[i]=$(node).text();
			$(node).remove();
		}

		for (var i = 1; i<=counter ; i++) {
			var log = Math.floor(Math.log(i)/Math.LN2);
			var row = ".row-"+log;
			$(row).append('<div class="spot"><p class="element" id="node-'+i+'"">'+nodes[i-1]+'</p></div>');
			if(counter>1) {


				var parent = "#node-"+Math.floor(i/2);
				var me = "#node-"+i;

				$(me).connections({to: parent, within:".rows"});

			}

		}


		$(".make-tree").addClass('invisible');
		$(".build-heap").addClass('invisible');
		$("#add").addClass('invisible');
		$(".hint").remove();
		$('.element').connections('update');

	});



	$(".build-heap").click(function() {
		var nodes = [];
		for (var i = counter-1; i >= 0; i--) {
			var node = ".array p:nth-child("+(i+1)+")";
			nodes[i]=parseInt($(node).text());
			$(node).remove();
		}

		var heaptree = new heap(nodes);

		for (var i = 1; i<=counter ; i++) {
			var log = Math.floor(Math.log(i)/Math.LN2);
			var row = ".row-"+log;
			$(row).append('<div class="spot"><p class="element" id="node-'+i+'"">'+heaptree.heap[i-1]+'</p></div>');
			if(counter>1) {


				var parent = "#node-"+Math.floor(i/2);
				var me = "#node-"+i;

				$(me).connections({to: parent, within:".rows"});

			}

		}

		$(".build-heap").addClass('invisible');
		$(".make-tree").addClass('invisible');
		$("#add").addClass('invisible');
		$(".hint").remove();
		$('.element').connections('update');

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
			scambia(heap.heap, i, m);
			heapify(heap, m);
		}
	}

	function scambia(array, i, m) {
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




}); 

