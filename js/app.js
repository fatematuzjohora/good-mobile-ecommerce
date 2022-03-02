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
    document.getElementById("phone-details").innerHTML = "";
  } else if (phones.length === 0) {
    errorBlockSection();
    searchResultOutput.innerText = `No Result Found For "${searchPhoneName.value}"`;
    document.getElementById("phone-details").innerHTML = "";
  } else {
    searchResultOutput.style.display = "block";
    searchResultOutput.style.color = "red";
    searchResultOutput.style.fontSize = "25px";
    searchResultOutput.style.margin = "50px";
    searchResultOutput.innerText = `${phones.length} Items Found For "${searchPhoneName.value}"`;
    document.getElementById("phone-details").innerHTML = "";
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

// get phones by ID name
const phoneDetails = (singlePhone) => {
  const url = `https://openapi.programming-hero.com/api/phone/${singlePhone}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => singlePhoneDetails(data.data));
};

const singlePhoneDetails = (phoneDetails) => {
  const phoneDetailsDiv = document.getElementById("phone-details");
  phoneDetailsDiv.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");

  // show details card
  phoneDetailsDiv.innerHTML = `
  <div class="card mb-3 border-0">
  <div class="row g-0">
  <div class="col-md-4">
  <img src="${phoneDetails.image}" class="img-fluid h-75 rounded-start" alt="">
  </div>
  <div class="col-md-8">
  <div class="card-body">
  <h5 class="card-title">${phoneDetails.name}</h5>
  <p class="card-text mb-1"><small class="text-muted">${
    phoneDetails?.releaseDate
      ? phoneDetails.releaseDate
      : "No release date found"
  }</small></p>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">Storage: ${
    phoneDetails.mainFeatures?.storage
  }</li>
  <li class="list-group-item">Display: ${
    phoneDetails.mainFeatures?.displaySize
  }</li>
  <li class="list-group-item">ChipSet: ${
    phoneDetails.mainFeatures?.chipSet
  }</li>
  <li class="list-group-item">Memory: ${phoneDetails.mainFeatures?.memory}</li>
  <li class="list-group-item">Sensors: ${
    phoneDetails.mainFeatures?.sensors
  }</li>
  <li class="list-group-item">WLAN: ${
    phoneDetails.others?.WLAN ? phoneDetails.others.WLAN : "no WLAN info found"
  }</li>
  <li class="list-group-item">Bluetooth: ${
    phoneDetails.others?.Bluetooth
      ? phoneDetails.others.Bluetooth
      : "no Blouetooth details found"
  }</li>
              <li class="list-group-item">GPS: ${
                phoneDetails.others?.GPS
                  ? phoneDetails.others.GPS
                  : "no GPS info found"
              }</li>
              <li class="list-group-item">NFC: ${
                phoneDetails.others?.NFC
                  ? phoneDetails.others.NFC
                  : "no NFC info found"
              }</li>
              <li class="list-group-item">Radio: ${
                phoneDetails.others?.Radio
                  ? phoneDetails.others.Radio
                  : "no Radio info found"
              }</li>
              <li class="list-group-item">USB: ${
                phoneDetails.others?.USB
                  ? phoneDetails.others.USB
                  : "no USB info found"
              }</li>
              </ul>
              </div>
              </div>
              </div>
              </div>
              `;
};
phoneDetailsDiv.appendChild(div);
