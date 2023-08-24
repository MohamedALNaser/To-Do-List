var inp = document.getElementById("input");
let add = document.getElementById("add");
let tasks = document.getElementById("tasks");
let del = document.getElementById("delete");
let input = document.getElementById("input");
let deleted = document.getElementById("Deleted");
let deletedDiv = document.getElementById("DeletedDiv");
let local = window.localStorage;
// tasks.classList.contains("deltedBefore");
// local.clear();
let intery = [];
let check = [];
let deletedSetLocal = [];

let dataSetLocal = {};
let timeSetLocal = {};
let deleteddataSetLocal = {};
let deletedtimeSetLocal = {};
let flag = false;

let removeFrequence = function (arr1, arr2) {
  arr2.forEach((e) => {
    if (arr2.includes(e) == arr1.includes(e)) {
      arr2 = removeItem(arr2, e);
    }
  });

  localStorage.setItem("deletedSetLocal", JSON.stringify(arr2));
};

let removeItem = function (arr = [], remItem = "item") {
  /// arr is the array which will remmove reItem from it
  let temp = [];
  arr.forEach((e, i) => {
    if (e !== remItem) temp.push(e);
  });
  return temp;
};
let delteButton = function (div, deletedBeforeFlage) {
  if (deletedBeforeFlage === false) {
    let dele = document.createElement("input");
    dele.setAttribute("type", "button");
    dele.setAttribute("value", "Delete");
    dele.id = "delete";
    div.appendChild(dele);

    //delete button of tasks
    dele.addEventListener("click", (e) => {
      let item = dele.parentElement.parentElement.children[0].textContent;
      if (!deletedSetLocal.includes(`${item}`.toLowerCase())) {
        deletedSetLocal.push(item.toLowerCase());
        localStorage.setItem(
          "deletedSetLocal",
          JSON.stringify(deletedSetLocal)
        );
      }

      intery = removeItem(intery, item);
      localStorage.setItem("inp", JSON.stringify(intery));
      // the date is storing in object

      dele.parentElement.parentElement.remove();
      newItem(item, deletedSetLocal.length, true);
    });
  } else {
    let deletedBefore = document.createElement("input");
    deletedBefore.setAttribute("type", "button");
    deletedBefore.setAttribute("value", "Delete");
    deletedBefore.id = "deletedBefore";
    div.appendChild(deletedBefore);
    //delete button of Deleted div
    deletedBefore.addEventListener("click", (e) => {
      let item =
        deletedBefore.parentElement.parentElement.children[0].textContent;
      // if (!deletedSetLocal.includes(`${item}`.toLowerCase())) {
      // 	deletedSetLocal.push(item.toLowerCase());
      // 	localStorage.setItem(
      // 		"deletedSetLocal",
      // 		JSON.stringify(deletedSetLocal)
      // 	);
      // }

      deletedSetLocal = removeItem(deletedSetLocal, item);
      localStorage.setItem("deletedSetLocal", JSON.stringify(deletedSetLocal));

      check = removeItem(check, item);
      localStorage.setItem("DoneCheck", JSON.stringify(check));

      // the date is storing in object
      delete dataSetLocal[`${item}`];
      localStorage.setItem("data", JSON.stringify(dataSetLocal));

      delete timeSetLocal[`${item}`];
      localStorage.setItem("time", JSON.stringify(timeSetLocal));

      deletedBefore.parentElement.parentElement.remove();
    });
  }
};
let doneButton = function (div, donee, delted) {
  // div is btnDiv which is the parent of 3 buttons
  if (!delted) {
    let done = document.createElement("input");
    done.setAttribute("type", "button");
    done.setAttribute("value", "Done");
    done.id = "done";
    div.appendChild(done);
    done.parentElement.parentElement.children[0].style.cssText =
      " text-decoration: none;opacity: 1;";
    if (donee) {
      done.style.opacity = "1";
      div.parentElement.classList.add("Done");
      done.classList.add("active");
      done.parentElement.parentElement.children[0].style.cssText =
        " text-decoration: line-through;opacity: 0.5;";
    }
    done.addEventListener("click", (e) => {
      if (div.parentElement.classList.contains("Done")) {
        done.classList.remove("active");
        div.parentElement.classList.remove("Done");
        done.parentElement.parentElement.children[0].style.cssText =
          " text-decoration: none;opacity: 1;";
        check = removeItem(
          check,
          done.parentElement.parentElement.children[0].textContent
        );
        localStorage.setItem("DoneCheck", JSON.stringify(check));
      } else {
        // done.parentElement.parentElement.children[0].style.cssText =
        //   " text-decoration: line-through;opacity: 0.5;";
        // done.style.backgroundColor = "#009688";
        done.classList.add("active");
        done.style.opacity = "1";
        div.parentElement.classList.add("Done");
        check.push(div.parentElement.children[0].textContent);
        localStorage.setItem("DoneCheck", JSON.stringify(check));
      }
    });
  } else {
    let addDeletedBefore = document.createElement("input");
    addDeletedBefore.setAttribute("type", "button");
    addDeletedBefore.setAttribute("value", "New");
    addDeletedBefore.id = "Done";
    div.appendChild(addDeletedBefore);

    addDeletedBefore.addEventListener("click", (e) => {
      let item =
        addDeletedBefore.parentElement.parentElement.children[0].textContent;
      if (
        !intery.includes(`${item}`.toLowerCase()) &&
        `${item}`.trim() !== ""
      ) {
        intery.push(item);
        localStorage.setItem("inp", JSON.stringify(intery));
        newItem(item, intery.length);
      }

      deletedSetLocal = removeItem(deletedSetLocal, e);
      localStorage.setItem("deletedSetLocal", JSON.stringify(deletedSetLocal));
      addDeletedBefore.parentElement.parentElement.remove();
    });
  }
};
// in edit function i will add the edit button and when i click on it i will change put the text in the input#input so i can edit it and save it in local storge and display it and delete the old one
let editButton = function (div) {
  let edit = document.createElement("input");
  let Cancel = document.getElementById("clear");
  edit.setAttribute("type", "button");
  edit.setAttribute("value", "Edit");
  edit.id = "edit";
  div.appendChild(edit);
  edit.addEventListener("click", (e) => {
    let item = edit.parentElement.parentElement.children[0].textContent;
    input.value = item;

    let add = document.getElementById("add");
    add.value = "save";
    add.addEventListener("click", () => {
      if (
        !intery.includes(inp.value.toLowerCase()) &&
        inp.value.trim() !== ""
      ) {
        intery.push(inp.value.toLowerCase());
        localStorage.setItem("inp", JSON.stringify(intery));
        newItem(inp.value, intery.length - 1);
      }
      intery = removeItem(intery, item);
      localStorage.setItem("inp", JSON.stringify(intery));
      edit.parentElement.parentElement.remove();
      intery = removeItem(intery, item);
      localStorage.setItem("inp", JSON.stringify(intery));
      delete dataSetLocal[`${item}`];
      localStorage.setItem("data", JSON.stringify(dataSetLocal));
      inp.value = "";
      add.value = "New";
      Cancel.value = "Clear";
    });
    Cancel.value = "Cancel";
    Cancel.addEventListener("click", () => {
      add.value = "New";
      inp.value = "";
      Cancel.value = "Clear";
    });
  });
};
let getTime = function (div, datLocal, flagTime) {
  let dateSet = document.createElement("div");
  let pDataSet = document.createElement("p");
  let spanDataSet = document.createElement("span");
  let spanTimeSet = document.createElement("span");
  dateSet.id = "div-data";
  pDataSet.id = "p-data";
  spanDataSet.id = "span-data";
  spanTimeSet.id = "span-time";
  let data = new Date();
  let dayText = data.getDate();
  let monthText = data.getMonth() + 1;
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

  if (timeSetLocal[datLocal] !== undefined && !flagTime) {
    spanTimeSet.appendChild(document.createTextNode("time: "));
    let getTimeLocal = document.createTextNode(timeSetLocal[`${datLocal}`]);
    spanTimeSet.appendChild(getTimeLocal);
    pDataSet.appendChild(spanTimeSet);
  } else if (deletedtimeSetLocal[datLocal] !== undefined && flagTime) {
    spanTimeSet.appendChild(document.createTextNode("time: "));
    let getdelteTimeLocal = document.createTextNode(
      deletedtimeSetLocal[`${datLocal}`]
    );
    spanTimeSet.appendChild(getdelteTimeLocal);
    pDataSet.appendChild(spanTimeSet);
  } else {
    spanTimeSet.appendChild(document.createTextNode("time: "));
    spanTimeSet.appendChild(hours);
    spanTimeSet.appendChild(minutes);
    spanTimeSet.appendChild(seconds);
    timeSetLocal[`${datLocal}`] = `${hoursText}:${minutesText}:${secondsText}`;
    localStorage.setItem("time", JSON.stringify(timeSetLocal));
    pDataSet.appendChild(spanTimeSet);
  }

  if (dataSetLocal[datLocal] !== undefined && !flagTime) {
    spanDataSet.appendChild(document.createTextNode("Date: "));
    let getDateLocal = document.createTextNode(dataSetLocal[`${datLocal}`]);
    spanDataSet.appendChild(getDateLocal);
    pDataSet.appendChild(spanDataSet);
  } else if (deleteddataSetLocal[datLocal] !== undefined && flagTime) {
    spanDataSet.appendChild(document.createTextNode("Date: "));
    let getedleDateLocal = document.createTextNode(
      deleteddataSetLocal[`${datLocal}`]
    );
    spanDataSet.appendChild(getedleDateLocal);
    pDataSet.appendChild(spanDataSet);
  } else {
    spanDataSet.appendChild(document.createTextNode("Date: "));
    spanDataSet.appendChild(day);
    spanDataSet.appendChild(month);
    spanDataSet.appendChild(year);
    dataSetLocal[`${datLocal}`] = `${dayText}/${monthText}/${yearText}`;
    localStorage.setItem("data", JSON.stringify(dataSetLocal));
    pDataSet.appendChild(spanDataSet);
  }

  dateSet.appendChild(pDataSet);
  div.appendChild(dateSet);
};
let newItem = function (data, index, delted) {
  // show the new item
  let newdiv = document.createElement("div");
  let dataItem = document.createElement("p");
  let dataText = document.createTextNode(data);
  let btnDiv = document.createElement("div");
  btnDiv.id = "btnDiv";
  dataItem.appendChild(dataText);
  newdiv.classList.add(`Show-${index}`);
  newdiv.appendChild(dataItem);
  newdiv.appendChild(btnDiv);
  newdiv.style.order = `-${index}`;

  if (delted) {
    newdiv.className = "deltedBefore";
    if (check.includes(data)) {
      doneButton(btnDiv, true, true);
    } else {
      doneButton(btnDiv, false, true);
    }
    delteButton(btnDiv, true);
    deletedDiv.appendChild(newdiv);
  } else {
    if (check.includes(`${data}`)) {
      doneButton(btnDiv, true, false);
    } else {
      doneButton(btnDiv, false, false);
    }
    delteButton(btnDiv, false);
    tasks.appendChild(newdiv);
  }
  editButton(btnDiv);
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
//get Delted data from local storge
let getAllItemsDelted = function () {
  // display data in local storge
  if (deletedSetLocal.length !== 0) {
    deletedSetLocal.forEach((ele, i) => {
      newItem(ele, i, true);
    });
  }
};

// get data from local storge
if (local.getItem("data")) {
  dataSetLocal = JSON.parse(local.getItem("data"));
}
if (local.getItem("time")) {
  timeSetLocal = JSON.parse(local.getItem("time"));
}

if (local.getItem("DoneCheck")) {
  check = JSON.parse(local.getItem("DoneCheck"));
}
if (local.getItem("deleteddata")) {
  deleteddata = JSON.parse(local.getItem("deleteddata"));
}
if (local.getItem("deletedtime")) {
  deletedtime = JSON.parse(local.getItem("deletedtime"));
}
if (local.getItem("inp")) {
  intery = JSON.parse(local.getItem("inp"));
  // intery.toLowerCase();
  // deletedSetLocal.toLowerCase();
  getAllItems();
}
if (local.getItem("deletedSetLocal")) {
  deletedSetLocal = JSON.parse(local.getItem("deletedSetLocal"));
  removeFrequence(intery, deletedSetLocal);
  getAllItemsDelted();
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

window.onload = function () {
  window.onresize = function () {
    if (window.innerWidth < 375) {
      // input.setAttribute("maxlength", "25");
      // input.setAttribute("placeholder", `max 25 character`);
    } else if (window.innerWidth < 991) {
      // input.setAttribute("maxlength", "30");
      // input.setAttribute("placeholder", `max 30 character`);
    } else if (window.innerWidth > 991) {
      // input.setAttribute("maxlength", "35");
      // input.setAttribute("placeholder", `max 35 character`);
    }
    if (window.innerWidth < 375) {
      console.log("hi");
    }
  };
  let clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    if (clear.value === "cancel") {
      inp.value = "";
    } else if (clear.value === "Clear") {
      localStorage.clear();

      location.reload();
    }
  });
};

deleted.style.transitionDuration = "0.3s";
// let remove = document.getElementById("remove");
deleted.addEventListener("click", (e) => {
  if (deleted.value === "Deleted") {
    // add.style.display = "none";
    // remove.style.display = "inline";
    deleted.value = "Tasks";
    deleted.title = "Show Tasks";
    tasks.style.display = "none";
    deletedDiv.style.display = "flex";
    // remove.addEventListener("click", (e) => {
    //   e.currentTarget;
    //   deletedSetLocal.forEach((item, i) => {
    //     deletedSetLocal = removeItem(deletedSetLocal, item);

    //     check = removeItem(check, item);
    //     localStorage.setItem("DoneCheck", JSON.stringify(check));

    //     // the date is storing in object
    //     delete dataSetLocal[`${item}`];
    //     localStorage.setItem("data", JSON.stringify(dataSetLocal));

    //     delete timeSetLocal[`${item}`];
    //     localStorage.setItem("time", JSON.stringify(timeSetLocal));

    //     // item.currentTarget.parentElement.parentElement.remove();
    //   });
    //   localStorage.setItem("deletedSetLocal", JSON.stringify(deletedSetLocal));
    // });
  } else if (deleted.value === "Tasks") {
    add.style.display = "inline";
    // remove.style.display = "none";
    deleted.value = "Deleted";
    deleted.title = "Show Deleted";
    deletedDiv.style.display = "none";
    tasks.style.display = "flex";
  }
});

// add function to edit the item and save it in local storge and display it
