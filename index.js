const imageTag = document.getElementById('imageTag');

window.electronAPI.getImage((e, data) => {
	imageTag.src = data;
	window.electronAPI.closeWindow2();
});
