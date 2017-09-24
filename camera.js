var camera;

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
};
