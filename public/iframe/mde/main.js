window.addEventListener('message', function (e) {
	if (e.data.type == 'get') {
		this.window.parent.postMessage({
			type: "response-get",
			data: {
				content: this.document.querySelector('textarea').value,
			}
		})
	}

	if (e.data.type == 'set') {
		this.document.querySelector('textarea').value = e.data.content;
	}
});
