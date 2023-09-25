const iframe = document.querySelector('iframe#mde');
document.querySelector('button[id="submit-button"]').addEventListener('click', () => {
	window.addEventListener('message', (e) => {
		console.log(e);
		if (e.data.type == "response-get") {
			document.querySelector('textarea#content').value = e.data.data.content;
			document.querySelector('input#submit').click();
		}
	})
	iframe.contentWindow.postMessage({ type: "get" });
})
