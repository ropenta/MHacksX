var camera;

function starter() {
	init();
	// setInterval(snap, 5000);
	
}

function snap() {
	var snapshot = camera.capture();
	snapshot.get_canvas(add_snapshot);
}

function init() {
	var options = {
		shutter_ogg_url: "https://raw.githubusercontent.com/amw/jpeg_camera/master/dist/shutter.ogg",
		shutter_mp3_url: "https://raw.githubusercontent.com/amw/jpeg_camera/master/dist/shutter.mp3",
		swf_url: "https://github.com/amw/jpeg_camera/blob/master/dist/jpeg_camera.swf?raw=true",
	};
	camera = new JpegCamera("#camera", options).ready(function (info) {
		console.log("Camera ready", info);
	});

}

function add_snapshot(element) {
	$(element).data("snapshot", this).addClass("item");

	var $container = $("#snapshots").append(element);
	var $camera = $("#camera");
	var camera_ratio = $camera.innerWidth() / $camera.innerHeight();

	var height = $container.height()
	element.style.height = "" + height + "px";
	element.style.width = "" + Math.round(camera_ratio * height) + "px";

	var scroll = $container[0].scrollWidth - $container.innerWidth();

	$container.animate({
		scrollLeft: scroll
	}, 200);

	upload_snapshot(this);
};


var upload_snapshot = function (snapshot) {
	apiUrl = "http://ec2-52-25-232-222.us-west-2.compute.amazonaws.com:4567/upload";

	console.log(snapshot);
	console.log(snapshot._extra_canvas);

	if (snapshot._extra_canvas.toBlob) {
		snapshot._extra_canvas.toBlob(function (blob) {
			var formData = new FormData();
			formData.append('uploadfile', blob, "photo.jpg");
			var seriesPath = apiUrl;
			$.ajax({
				type: "POST",
				url: seriesPath,
				data: formData,
				processData: false,
				contentType: false,
			}).done(function () {
				console.log("Upload Successful");
				// more shit
			}).fail(function () {
			});
		}, 'image/jpg');
	}
};


window.addEventListener('load', starter, false);