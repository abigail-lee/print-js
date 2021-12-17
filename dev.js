(function() {
	'use strict';

/* -- Tools -- */

	// function analytics(action, label='null') {
	// 	window.dataLayer.push({
	// 		'event': 'Interactive',
	// 		'category': 'Interactive',
	// 		'action': action,
	// 		'label': label
	// 	});
	// 	// console.clear();
	// 	// console.table(window.dataLayer);
	// }

	// function throttle(callback, limit) {
	// 	var wait = false;
	// 	return function() {
	// 		if (wait) return;
	// 		callback.call();
	// 		wait = true;
	// 		setTimeout(function(){
	// 			wait = false;
	// 		}, limit);
	// 	}
	// }

/* -- Function -- */

	// Get the version if it is A or B
	const getRandomBasedOn = (variation) => Math.random() > variation;

	// Get percentage
	const getPercentage = (number) => (number * 100).toFixed(2);

/* -- Application -- */

	function app() {
		function csvDownload(){
			let data = { "users": [
			{ "name": "Abigail",
				"age": 28},
				{"name": "Bobo",
					"age": 27 }
			]},
			link = document.getElementById("download-csv");

			const items = data.users;
			const replacer = (key, value) => value === null ? '' : value;
			const header = Object.keys(items[0]);
			const csv = [header.join(','), ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(', '))
			].join('\r\n');

			console.log(csv);

			const blob = new Blob([csv], {type: 'text/csv;encoding:utf-8'});

			link.href = URL.createObjectURL(blob);
			link.setAttribute('download', "myFile.csv");
		}

		function svgDownload(){
			let svg = document.getElementById("myIcon"),
				link = document.getElementById("download-svg");
			const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});

			link.href = URL.createObjectURL(blob);
			link.setAttribute('download', 'myIcon.svg');
		}

		function convertSVG(){
			let svg = document.getElementById("myIcon"),
				link = document.getElementById("convert");
				 
			function triggerDownload (imgURI) {
			  var evt = new MouseEvent('click', {
			    view: window,
			    bubbles: false,
			    cancelable: true
			  });

			  var a = document.createElement('a');
			  a.setAttribute('download', '3MY_COOL_IMAGE3.png');
			  a.setAttribute('href', imgURI);
			  a.setAttribute('target', '_blank');

			  a.dispatchEvent(evt);
			}

			link.addEventListener("click", () => {
				var canvas = document.getElementById("hidden");
				var ctx = canvas.getContext('2d');
				  var data = (new XMLSerializer()).serializeToString(svg);
				  var DOMURL = window.URL || window.webkitURL || window;

				  var img = new Image();
				  var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
				  var url = DOMURL.createObjectURL(svgBlob);

				  img.onload = function () {
				    ctx.drawImage(img, 0, 0);
				    DOMURL.revokeObjectURL(url);

				    var imgURI = canvas
				        .toDataURL('image/png')
				        .replace('image/png', 'image/octet-stream');

				    triggerDownload(imgURI);
				  };

				  img.src = url;
			})
		}

		function printIt(){
			let printStyles = new String("<link href='app.css' rel='stylesheet' type='text/css' />");
			window.frames["print_frame"].document.body.innerHTML = printStyles + document.getElementById("myIcon").outerHTML;
			
			setTimeout(() => {
				window.frames["print_frame"].window.focus();
				window.frames["print_frame"].window.print();
			}, 500);
		}
		
		convertSVG();
		svgDownload();
		csvDownload();

		document.getElementById("printIf").addEventListener("click", function(e){
			e.preventDefault();
			printIt();
		})
	}

	// Start the whole thing when the DOM is complete
	document.addEventListener('readystatechange', function() {
		document.readyState === 'interactive' && app();
	}, false);

// end of the interactive
})();
