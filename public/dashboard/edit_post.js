const iframe = document.querySelector('iframe#mde');
document.querySelector('button[id="load"]').addEventListener('click', async () => {
	const json = await fetch(`/dashboard/edit_post/api?post_id=${document.querySelector('input[name="post_id"]').value}&author=${document.querySelector('input[name="user_id"]').value}&type=${document.querySelector('select[name="type"]').value}`).then((res) => res.json());
	document.querySelector('input[name="public"]').checked = json[0].public;
	iframe.contentWindow.postMessage({ type: "set", content: json[0].content });
})
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
