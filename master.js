var inp = document.getElementById("input");
let add = document.getElementById("add");
let tasks = document.getElementById("tasks");
let del = document.getElementById("delete");
let local = window.localStorage;
// local.clear();
let intery = [];
let check = [];
let dataSetLocal = {};
let timeSetLocal = {};
let flag = false;

let removeItem = function (arr = [], remItem = "item") {
	/// arr is the array which will remmove reItem from it
	let temp = [];
	arr.forEach((e, i) => {
		if (e !== remItem) temp.push(e);
	});
	return temp;
};
let delteButton = function (div) {
	let dele = document.createElement("input");
	dele.setAttribute("type", "button");
	dele.setAttribute("value", "Delete");
	dele.id = "delete";
	div.appendChild(dele);

	dele.addEventListener("click", (e) => {
		intery = removeItem(
			intery,
			dele.parentElement.parentElement.children[0].textContent
		);
		localStorage.setItem("inp", JSON.stringify(intery));
		check = removeItem(
			check,
			dele.parentElement.parentElement.children[0].textContent
		);
		localStorage.setItem("DoneCheck", JSON.stringify(check));
		delete dataSetLocal[
			`${dele.parentElement.parentElement.children[0].textContent}`
		];
		localStorage.setItem("data", JSON.stringify(dataSetLocal));

		delete timeSetLocal[
			`${dele.parentElement.parentElement.children[0].textContent}`
		];
		localStorage.setItem("time", JSON.stringify(timeSetLocal));
		dele.parentElement.parentElement.remove();
	});
};
let doneButton = function (div, donee) {
	let done = document.createElement("input");
	done.setAttribute("type", "button");
	done.setAttribute("value", "Done");
	done.id = "done";
	div.appendChild(done);
	if (donee) {
		done.style.backgroundColor = "#009688";
		done.style.opacity = "1";
		div.parentElement.classList.add("Done");
	}
	done.addEventListener("click", (e) => {
		if (div.parentElement.classList.contains("Done")) {
			done.style.backgroundColor = "#ffffff";
			done.style.opacity = "0.4";
			div.parentElement.classList.remove("Done");
			check = removeItem(
				check,
				done.parentElement.parentElement.children[0].textContent
			);
			localStorage.setItem("DoneCheck", JSON.stringify(check));
		} else {
			done.style.backgroundColor = "#009688";
			done.style.opacity = "1";
			div.parentElement.classList.add("Done");
			check.push(div.parentElement.children[0].textContent);
			localStorage.setItem("DoneCheck", JSON.stringify(check));
		}
	});
};

let getTime = function (div, datLocal) {
	let dateSet = document.createElement("div");
	let pDataSet = document.createElement("p");
	let spanDataSet = document.createElement("span");
	let spanTimeSet = document.createElement("span");
	pDataSet.id = "p-data";
	spanDataSet.id = "span-data";
	spanTimeSet.id = "span-time";

	dateSet.style.cssText = `padding: 0; margin: 0; `;
	let data = new Date();
	let dayText = data.getDate();
	let monthText = data.getMonth();
	let yearText = data.getFullYear();

	let day = document.createTextNode(`${dayText}/`);
	let month = document.createTextNode(`${monthText}/`);
	let year = document.createTextNode(yearText);

	let hoursText = data.getHours();
	let minutesText = data.getMinutes();
	let secondsText = data.getSeconds();

	if (hoursText >= 12) {
		hoursText = hoursText - 12;
	}
	let hours = document.createTextNode(`${hoursText}:`);
	let minutes = document.createTextNode(`${minutesText}:`);
	let seconds = document.createTextNode(secondsText);

	if (timeSetLocal[datLocal] == undefined) {
		spanTimeSet.appendChild(document.createTextNode("time: "));

		spanTimeSet.appendChild(hours);
		spanTimeSet.appendChild(minutes);
		spanTimeSet.appendChild(seconds);
		timeSetLocal[`${datLocal}`] = `${hoursText}:${minutesText}:${secondsText}`;
		localStorage.setItem("time", JSON.stringify(timeSetLocal));
		pDataSet.appendChild(spanTimeSet);
	} else {
		spanTimeSet.appendChild(document.createTextNode("time: "));
		let getTimeLocal = document.createTextNode(timeSetLocal[`${datLocal}`]);
		spanTimeSet.appendChild(getTimeLocal);
		pDataSet.appendChild(spanTimeSet);
	}

	if (dataSetLocal[datLocal] == undefined) {
		spanDataSet.appendChild(document.createTextNode("Date: "));
		spanDataSet.appendChild(day);
		spanDataSet.appendChild(month);
		spanDataSet.appendChild(year);

		dataSetLocal[`${datLocal}`] = `${dayText}/${monthText}/${yearText}`;
		localStorage.setItem("data", JSON.stringify(dataSetLocal));
		pDataSet.appendChild(spanDataSet);
	} else {
		spanDataSet.appendChild(document.createTextNode("Date: "));
		let getDateLocal = document.createTextNode(dataSetLocal[`${datLocal}`]);
		spanDataSet.appendChild(getDateLocal);
		pDataSet.appendChild(spanDataSet);
	}

	dateSet.appendChild(pDataSet);
	div.appendChild(dateSet);
};
let newItem = function (data, index) {
	// show the new item
	let newdiv = document.createElement("div");
	let dataItem = document.createElement("p");
	let dataText = document.createTextNode(data);
	let btnDiv = document.createElement("div");
	btnDiv.id = "btnDiv";
	tasks.appendChild(newdiv);
	dataItem.appendChild(dataText);
	newdiv.classList.add(`Show-${index}`);
	newdiv.appendChild(dataItem);
	newdiv.appendChild(btnDiv);
	newdiv.style.order = `-${index}`;
	if (check.includes(data)) {
		doneButton(btnDiv, true);
	} else {
		doneButton(btnDiv, false);
	}

	delteButton(btnDiv);
	getTime(newdiv, data);
};

//get data from local storge
let getAllItems = function () {
	// display data in local storge
	if (intery.length !== 0) {
		intery.forEach((ele, i) => {
			newItem(ele, i);
		});
	}
};

if (local.getItem("DoneCheck")) {
	check = JSON.parse(local.getItem("DoneCheck"));
}
if (local.getItem("data")) {
	dataSetLocal = JSON.parse(local.getItem("data"));
}
if (local.getItem("time")) {
	timeSetLocal = JSON.parse(local.getItem("time"));
}
if (local.getItem("inp")) {
	intery = JSON.parse(local.getItem("inp"));
	getAllItems();
}

//add item and check thier is no frequence

add.addEventListener("click", () => {
	if (!intery.includes(inp.value.toLowerCase()) && inp.value.trim() !== "") {
		intery.push(inp.value.toLowerCase());
		localStorage.setItem("inp", JSON.stringify(intery));
		newItem(inp.value, intery.length - 1);
	}
	inp.value = "";
});

let input = document.getElementById("input");
input.setAttribute("maxlength", "20");
window.onload = function () {
	window.onresize = function () {
		if (window.innerWidth < 375) {
			input.setAttribute("maxlength", "25");
			input.setAttribute("placeholder", `max 25 character`);
		} else if (window.innerWidth < 991) {
			input.setAttribute("maxlength", "30");
			input.setAttribute("placeholder", `max 30 character`);
		} else if (window.innerWidth > 991) {
			input.setAttribute("maxlength", "35");
			input.setAttribute("placeholder", `max 35 character`);
		}
	};
};
