const inputLink = document.querySelector("form input");
const form = document.querySelector("form");

let link = "";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  link = inputLink.value;
  console.log(link);
  fetchPages();
});

async function fetchData() {
  const response = await fetch(link, {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
    },
    method: "GET",
    mode: "cors",
  });
  const responseJson = response.json();
  return responseJson;
}

const container = document.querySelector(".container");
const renderPagesContainer = document.querySelector(".pages");

let pages = [];
let initialCount = 0;
let finalCount = 10;

function renderImages() {
  container.innerHTML = ``;
  if (finalCount >= responsePages.length) {
    renderPagesContainer.innerHTML = `
  ${responsePages.length} / ${responsePages.length} pages
  `;
  } else {
    renderPagesContainer.innerHTML = `
    ${finalCount} / ${responsePages.length} pages
    `;
  }

  pages.map((item) => {
    container.innerHTML += `
        <div class="img-container">
          <img src="${item}" alt="">
        </div>
      `;
  });
}

let responsePages;
function fetchPages(initial = 0, final = 10) {
  const apiCall = fetchData();
  apiCall.then((response) => {
    responsePages = response.pages;
    pages = responsePages.slice(initial, final);
    renderImages();
  });
}

let imageCounter = 1; // Counter for sequential naming

function downloadImages() {
  initialCount += 10;
  finalCount += 10;

  pages.forEach(function (url) {
    fetch(url)
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;

        // Generate sequential name for the image
        var imageName = "image_" + imageCounter + ".jpg";
        imageCounter++;

        link.setAttribute("download", imageName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  });

  if (finalCount >= responsePages.length) {
    alert("This is the last download page.");
  }

  fetchPages(initialCount, finalCount);
}

