var Modal = function(){

	var modalOverlay = document.createElement('div');
		modalOverlay.setAttribute('class', 'modal-overlay');
		document.body.appendChild(modalOverlay);
		
	var config = {
		$modal: document.querySelector('.modal'),
		$modalOverlay: document.querySelector('.modal-overlay'),
		 modalOverlayColor: 'rgba(255,255,255,0.7)',
		$modalClose: document.querySelector('.modal-close'),
		$modalTrigger: document.querySelector('.modal-trigger'),
		$draggie: new Draggabilly( document.querySelector('.modal'), {
	  		handle: '.modal-header',
	  		containment: 'html'
		})
	}
	config.$modalOverlay.style.background = config.modalOverlayColor;


	var Modal = {
		createEvent: function(eventName, callback){

			var event = document.createEvent('HTMLEvents');
			event.initEvent(eventName, true, false);
			config.$modal.dispatchEvent(event);

			if (callback && typeof(callback) === "function") {
		        callback();
		    }

		},
		open: function(){

			config.$modal.style.visibility = "visible";
			config.$modal.classList.add('opening');
			config.$modal.classList.remove('closing');

			config.$modalOverlay.style.visibility = "visible";
			config.$modalOverlay.classList.add('opening');
			config.$modalOverlay.classList.remove('closing');

			Modal.createEvent('modalOpened', function(){
				//callback
			})

		},
		close: function(){

			config.$modal.classList.add('closing');
			config.$modal.classList.remove('opening');
			config.$modalOverlay.classList.add('closing');
			config.$modalOverlay.classList.remove('opening');

			var timer = window.setTimeout(function(){

				config.$modal.style.visibility = "hidden";
				config.$modalOverlay.style.visibility = "hidden";

				Modal.createEvent('modalClosed', function(){
					//callback
				});
			},500);

		},
		init: function(){

			config.$draggie.on( 'dragStart', function( instance, event, pointer ){
				console.log( 'dragMove on ' + event.type + pointer.pageX + ', ' + pointer.pageY + ' position at ' + instance.position.x + ', ' + instance.position.y );
			});

			config.$modalClose.addEventListener("click", function(){

				Modal.close();

			}, false); 

			config.$modalTrigger.addEventListener("click", function(){

				Modal.open();

			}, false); 

			window.addEventListener("keydown", function(e){
				console.log(e.keyCode);

				if (e.keyCode == 27) {

					if( config.$modal.style.display != 'none'){
						Modal.close();
					}

				}

				if (e.keyCode == 38 && e.ctrlKey) {
					console.log('full');

					if(config.$modal.classList.contains("is-right") || config.$modal.classList.contains("is-left")){
						config.$modal.classList.remove("is-right");
						config.$modal.classList.remove("is-left");
						config.$draggie.enable();
					} else {
						config.$draggie.disable();
						config.$modal.classList.add("is-full");
					}

				}

				if (e.keyCode == 37 && e.ctrlKey) {
			    	console.log('left');

			    	if(config.$modal.classList.contains("is-right") || config.$modal.classList.contains("is-full")){
						config.$modal.classList.remove("is-right");
						config.$modal.classList.remove("is-full");
						config.$draggie.enable();
			    	} else {
			    		config.$modal.classList.add("is-left");
			    		config.$draggie.disable();
			    	}

			    }
				if (e.keyCode == 39 && e.ctrlKey) {
			     	console.log('right');

			    	if(config.$modal.classList.contains("is-left") || config.$modal.classList.contains("is-full")){
						config.$modal.classList.remove("is-left");
						config.$modal.classList.remove("is-full");
						config.$draggie.enable();
			    	} else {
				     	config.$modal.classList.add("is-right");
				     	config.$draggie.disable();
			    	}

			    }


				if (e.keyCode == 40 && e.ctrlKey) {

					if(config.$modal.classList.contains("is-full")){
						config.$modal.classList.remove("is-full");
						config.$draggie.enable();
					}

				}

			});

			config.$modal.addEventListener("modalOpened", function(){
				console.log("Modal Opened");
			})
			config.$modal.addEventListener("modalClosed", function(){
				console.log("Modal Closed");
			})

		}
	}

	Modal.config = config;
	return Modal;

}();