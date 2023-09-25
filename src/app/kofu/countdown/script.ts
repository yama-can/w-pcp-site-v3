import { tocolor, complementary_color, hsvToRgb, colorToText } from "./colors";

export default async function main() {

	let countdown = document.querySelector("div.countdown") as HTMLDivElement;
	let undertime = new Date(
		new Date(2023, 8, 30, 0).getTime() - new Date().getTime()
	);
	window.setInterval(function () {
		let m = tocolor(undertime.getMonth(), 2),
			d = tocolor(undertime.getDate(), 2),
			h = tocolor(undertime.getHours(), 2),
			min = tocolor(undertime.getMinutes(), 2),
			s = tocolor(undertime.getSeconds(), 2),
			ss = tocolor(Math.floor(undertime.getMilliseconds() / 10), 2);
		countdown!!.innerHTML =
			"<h1><font class='num l'>" +
			m +
			'</font><font class="l">/</font><font class="num">' +
			d +
			'</font><font class="l"> </font><font class="num">' +
			h +
			'</font><font class="l num">:</font><font class="num">' +
			min +
			'</font><font class="l num">:</font><font class="num">' +
			s +
			'</font><font class="l num">.</font><font class="num">' +
			ss +
			'</font><font class="l num"> Left</font></h1>';
		undertime = new Date(
			new Date(2023, 8, 30, 0).getTime() - new Date().getTime()
		);
		const rightColor = hsvToRgb(
			(undertime.getSeconds() + undertime.getMilliseconds() / 1000) * 6,
			1,
			1
		);
		const leftColor = complementary_color(rightColor[0], rightColor[1], rightColor[2])!!;
		countdown!!.style.background = `linear-gradient(90deg, ${colorToText(leftColor)}, ${colorToText(rightColor)})`;
		countdown!!.style.color = `white`;
		countdown!!.style.textShadow = `0 0 10px rgb(0,0,0,0.3)`;
	}, 10);
}
