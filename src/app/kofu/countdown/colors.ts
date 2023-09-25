export function hsvToRgb(H: number, S: number, V: number) {
	//https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

	var C = V * S;
	var Hp = H / 60;
	var X = C * (1 - Math.abs((Hp % 2) - 1));

	var R = 0,
		G = 0,
		B = 0;
	if (0 <= Hp && Hp < 1) {
		[R, G, B] = [C, X, 0];
	}
	if (1 <= Hp && Hp < 2) {
		[R, G, B] = [X, C, 0];
	}
	if (2 <= Hp && Hp < 3) {
		[R, G, B] = [0, C, X];
	}
	if (3 <= Hp && Hp < 4) {
		[R, G, B] = [0, X, C];
	}
	if (4 <= Hp && Hp < 5) {
		[R, G, B] = [X, 0, C];
	}
	if (5 <= Hp && Hp < 6) {
		[R, G, B] = [C, 0, X];
	}

	var m = V - C;
	[R, G, B] = [R + m, G + m, B + m];

	R = Math.floor(R * 255);
	G = Math.floor(G * 255);
	B = Math.floor(B * 255);

	return [R, G, B];
}

export function complementary_color(R: number, G: number, B: number) {
	//各値全てが数値かつ0以上255以下
	if (
		!isNaN(R + G + B) &&
		0 <= R &&
		R <= 255 &&
		0 <= G &&
		G <= 255 &&
		0 <= B &&
		B <= 255
	) {
		//最大値、最小値を得る
		var max = Math.max(R, Math.max(G, B));
		var min = Math.min(R, Math.min(G, B));

		//最大値と最小値を足す
		var sum = max + min;

		//R、G、B 値を和から引く
		var newR = sum - R;
		var newG = sum - G;
		var newB = sum - B;

		//文字列を返す
		return [newR, newG, newB];
	} else {
		//if 条件から外れた場合は null を返す
		return null;
	}
}

export function tocolor(num: number, l: number) {
	let v = "" + num;
	for (let i = 0; i < l - v.length; i++) {
		v = "0" + v;
	}
	return v;
}

export function colorToText(param: [number, number, number] | number[]) {
	return `rgb(${param[0]},${param[1]},${param[2]})`;
}
