const video = document.getElementById('camera');
const captureButton = document.getElementById('capture-image');
const imageTag = document.getElementById('image');

captureButton.addEventListener('click', () => {
	const canvas = document.createElement('canvas');
	// scale the canvas accordingly
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	// draw the video at that frame
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	// convert it to a usable data URL
	const dataURL = canvas.toDataURL();
	// imageTag.src = dataURL;
	// // window.electronAPI.setImage =
	window.electronAPI.sendImage(dataURL);
	new Notification('Image Captured', {
		body: 'Image is successfully captured from live video',
	});
});

navigator.mediaDevices
	.getUserMedia({ video: true })
	.then(function success(stream) {
		video.srcObject = stream;
	});
