const searchPhoneName = document.getElementById("search-field");
const searchResultDiv = document.getElementById("search-result");
const searchResultOutput = document.getElementById("search-result-output");
const spinner = document.getElementById("spinner");

// Fetch Data From API Based On Search Text
const searchPhone = () => {
  const searchText = searchPhoneName.value;
  searchResultOutput.style.display = "none";
  searchResultDiv.innerHTML = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  spinner.classList.remove("d-none");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.classList.add("d-none");
      displaySearchPhone(data.data);
    })
    .finally(() => {
      searchPhoneName.value = "";
    });
};

// Search Result Message Block When Error Occurred
const errorBlockSection = () => {
  searchResultOutput.style.display = "block";
  searchResultOutput.style.color = "red";
  searchResultOutput.style.fontSize = "25px";
  searchResultOutput.style.margin = "50px";
};

// Display Data Based On Search Text
const displaySearchPhone = (phones) => {
  // Search Result Message (Error & Total Items Found Message)
  if (searchPhoneName.value === "") {
    errorBlockSection();
    searchResultOutput.innerText = `Please input valid mobile name.`;
  } else if (phones.length === 0) {
    errorBlockSection();
    searchResultOutput.innerText = `No Result Found For "${searchPhoneName.value}"`;
  } else {
    searchResultOutput.style.display = "block";
    searchResultOutput.style.color = "red";
    searchResultOutput.style.fontSize = "25px";
    searchResultOutput.style.margin = "50px";
    searchResultOutput.innerText = `${phones.length} Items Found For "${searchPhoneName.value}"`;
  }

  phones.splice(0, 20).forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card text-center">
        <img class="w-50 mx-auto pt-2" src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
            <h4 class="fs-4">${phone.phone_name}</h4>
            <h5 class="fs-5 my-3">Brand: ${phone.brand}</h5>
            <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success w-100">Details</button>
        </div>
    </div>
    `;
    searchResultDiv.appendChild(div);
  });
};
