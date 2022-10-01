function convert() {
  const dobDate = getDobDate();
  if (!dobDate) {
    return;
  }
  const currentDate = getCurrentDate();
  const Age = getAge(dobDate, currentDate);
  if (!Age) {
    return;
  }
  console.log({ Age });
  showResult(Age);
}

function getDobDate() {
  const dobDate = document.getElementById("dob").value;
  var [y, m, d] = dobDate.split("-");
  if (!m && !d) {
    setErrorMessage("Enter Valid Date");
    return;
  }
  return { year: +y, month: +m, day: +d };
}

function getCurrentDate() {
  const objectDate = new Date();
  const day = objectDate.getDate();
  const month = objectDate.getMonth() + 1;
  const year = objectDate.getFullYear();
  return { year, month, day };
}

function getAge(dob, today) {
  if (
    dob.year > today.year ||
    (dob.year == today.year && dob.month > today.month) ||
    (dob.year == today.year && dob.month == today.month && dob.day > today.day)
  ) {
    setErrorMessage("Enter Date Past Current date");
    return;
  }
  month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (dob.day > today.day) {
    today.day = today.day + month[dob.month - 1];
    today.month = today.month - 1;
  }
  if (dob.month > today.month) {
    today.year = today.year - 1;
    today.month = today.month + 12;
  }
  var d = today.day - dob.day;
  var m = today.month - dob.month;
  var y = today.year - dob.year;
  return { y, m, d };
}
function setErrorMessage(err) {
  var modal = document.getElementById("errorSection");
  var span = document.getElementsByClassName("close")[0];
  var error = document.getElementById("errorMessage");
  modal.style.display = "block";
  error.textContent = err;
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function showResult(Age) {
  var result = document.getElementById("result");
  const Years = Age.y + " Years " + Age.m + " Months " + Age.d + " Days ";
  result.innerHTML = "You are " + Years + "old.";
}
