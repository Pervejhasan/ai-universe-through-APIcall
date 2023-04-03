/*============ load data call api =============*/
const loadData = async (dataLimit) => {
  toggleSpinner(true);
  const url = ` https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools, dataLimit);
};
const displayData = (allData, dataLimit) => {
  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";
  /* ==============display 6 data initially==================*/
  const showAllData = document.getElementById("show-allData");
  if (dataLimit && allData.length >= 6) {
    allData = allData.slice(0, 6);
    showAllData.classList.remove("d-none");
  } else {
    showAllData.classList.add("d-none");
  }
  /*------------- display all data start----------------*/
  allData.forEach((data) => {
    console.log(data);
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("col");
    dataDiv.innerHTML = `
    <div class="card p-2">
    <img src="${data.image}" class="card-img-top rounded-2" style="height:250px" alt="card image">
    <div class="card-body">
     <h3>Features</h3>
    <ol>
    <li>${data.features[0]}</li>
    <li>${data.features[1]}</li>
    <li>${data.features[2]}</li>
    </ol>
    <hr/>
<h3 class="fw-bold">${data.name}</h3>

<div class=" d-flex justify-content-between align-items-center ">
<div>
<input type="date" class="border-0"  style="width:20px;"  />
<span class="text-secondary fw-semibold">${data.published_in}</span>
</div>
<div>
<a href="#"  type="button" data-bs-toggle="modal"
data-bs-target="#showProductDetails" onClick="loadDataDetails('${data.id}')" id="accuracy-show" class="btn bg-primary px-2 bg-opacity-50 rounded-circle"><i class="fa-solid fa-arrow-right text-white fw-bold "></i></a></div>
</div>
</div>
  </div>
    `;
    dataContainer.appendChild(dataDiv);
  });
  // stop loader
  toggleSpinner(false);
};
/*------------- display all data end----------------*/
/* ============show spinner=========== */
const toggleSpinner = (isLoadding) => {
  const loaderSection = document.getElementById("loader");
  if (isLoadding) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
/*======================= load data details ====================*/
const loadDataDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showProductDetails(data.data));
};
const showProductDetails = (data) => {
  console.log(data);
  document.getElementById("productDetailsImage").src = data.image_link[0];
  const showDetailsContainer = document.getElementById("showDetailsContainer");
  const dataDetails = document.getElementById("data-details");
  /* =====accuracy show===== */
  if (data.accuracy.score) {
    document.getElementById("accuracy").innerText =
      data.accuracy.score + "%" + " accuracy";
    document.getElementById("accuracy").classList.remove("d-none");
  } else {
    document.getElementById("accuracy").classList.add("d-none");
  }
  data.accuracy.score
    ? (document.getElementById("accuracy").innerText =
        data.accuracy.score + "%" + " accuracy")
    : (document.getElementById("accuracy").innerText = "");
  dataDetails.innerHTML = `
<div class="card-body">
              <h5 class="card-title text-center fw-bold ">${
                data.description
              }</h5>
              <div class=" d-flex justify-content-center py-2">
              <div class="py-4 px-4 bg-warning rounded-2 me-1 bg-opacity-25 text-center"><p class=" text-break  card-text text-success ">${
                data.pricing ? data.pricing[0].price : "No data found"
              }</p></div>
              <div class="py-4 px-4 bg-warning rounded-2 me-1 bg-opacity-25 text-center"><p class=" text-break  card-text text-warning">${
                data.pricing ? data.pricing[1].price : "No data found"
              }</p></div>
              <div class="py-4 px-4 bg-warning rounded-2  bg-opacity-25 text-center">   <p class= " text-break  card-text text-danger ">${
                data.pricing ? data.pricing[2].price : "No data found"
              }</p></div>
              </div>
              <div class=" d-flex justify-content-between py-2">
              <div>
              <h2>Features</h2>
              <ul>
              <li class="text-secondary">${data.features[1].feature_name}</li>
              <li class="text-secondary">${data.features[2].feature_name}</li>
              <li class="text-secondary">${data.features[3].feature_name}</li>
              </ul>
              </div>
              <div>
              <h2>Integrations</h2>
              <ul>
              <li class="text-secondary">${
                data.integrations ? data.integrations[0] : "No data found"
              }</li>
              <li class="text-secondary">${
                data.integrations ? data.integrations[1] : "No data found"
              }</li>
              <li class="text-secondary">${
                data.integrations ? data.integrations[2] : "No data found"
              }</li>
              </ul>
              </div>
              </div>   
</div>
`;
  showDetailsContainer.innerHTML = "";
  const showDetailsDiv = document.createElement("div");
  showDetailsDiv.classList.add("p-2");
  showDetailsDiv.innerHTML = `
  <h5 class="modal-title fw-bold text-center">${
    data.input_output_examples
      ? data.input_output_examples[0].input
      : "No input here"
  }</h5>
  <p class="modal-title text-secondary  text-center">${
    data.input_output_examples
      ? data.input_output_examples[0].output
      : "No output here"
  }</p>
      `;
  showDetailsContainer.appendChild(showDetailsDiv);
};

/* =====show all data by click button===== */
document.getElementById("btn-showAll").addEventListener("click", function () {
  loadData();
});

loadData(6);
