// Sample data. Replace with your own items later.
const items = [
  {
    id: 1,
    name: "Oak Writing Desk",
    category: "Furniture",
    era: "c. 1890",
    origin: "Yorkshire, England",
    price: 1850,
    status: "Verified",
    condition: "Good. Original brass handles, one drawer runner replaced in 1974.",
    authenticity: "Joinery and wood aging checked by a furniture restorer. Maker's mark confirmed.",
    owners: [
      { period: "1890–1921", owner: "Harrow family, Leeds", source: "Sale receipt" },
      { period: "1921–1968", owner: "Leeds Grammar School", source: "School inventory" },
      { period: "1968–2019", owner: "Private collector", source: "Auction record" }
    ]
  },
  {
    id: 2,
    name: "Brass Carriage Clock",
    category: "Clocks",
    era: "c. 1910",
    origin: "Paris, France",
    price: 720,
    status: "Verified",
    condition: "Very good. Movement serviced in 2021. Small dent on the base.",
    authenticity: "Movement number matches the maker's catalogue. Inspected by a clock specialist.",
    owners: [
      { period: "1910–1950", owner: "Unknown, family papers incomplete", source: "None" },
      { period: "1950–2021", owner: "Estate of M. Dubois", source: "Estate sale catalogue" }
    ]
  },
  {
    id: 3,
    name: "Blue and White Porcelain Vase",
    category: "Ceramics",
    era: "Qing dynasty, 19th century",
    origin: "Jingdezhen, China",
    price: 2400,
    status: "Pending",
    condition: "Fair. Hairline crack near the rim, professionally stabilised.",
    authenticity: "Thermoluminescence test requested. Result not yet received.",
    owners: [
      { period: "Before 1930", owner: "Not documented", source: "None" },
      { period: "1930–1985", owner: "Private collection, Shanghai", source: "Photograph" },
      { period: "1985–present", owner: "Current seller", source: "Purchase invoice" }
    ]
  },
  {
    id: 4,
    name: "Victorian Garnet Brooch",
    category: "Jewellery",
    era: "c. 1870",
    origin: "Birmingham, England",
    price: 540,
    status: "Verified",
    condition: "Excellent. One garnet replaced during a 1960s repair.",
    authenticity: "Hallmarks read and confirmed by an independent assay office.",
    owners: [
      { period: "1870–1935", owner: "Whitmore family", source: "Family letters" },
      { period: "1935–2018", owner: "Descendants of the Whitmore family", source: "Will" }
    ]
  },
  {
    id: 5,
    name: "Landscape Oil Painting",
    category: "Art",
    era: "c. 1850",
    origin: "Edinburgh, Scotland",
    price: 3100,
    status: "Pending",
    condition: "Good. Cleaned and re-varnished in 2005. Original frame.",
    authenticity: "Signature under review. Canvas and pigment analysis scheduled.",
    owners: [
      { period: "1850–1902", owner: "Artist's patron, Edinburgh", source: "Exhibition label" },
      { period: "1902–1999", owner: "Not documented", source: "None" },
      { period: "1999–present", owner: "Current seller", source: "Auction record" }
    ]
  }
];

// Page elements
const itemList = document.getElementById("item-list");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const verifiedSelect = document.getElementById("verified");
const recordSection = document.getElementById("record");
const recordContent = document.getElementById("record-content");
const closeButton = document.getElementById("close-record");
const itemSelect = document.getElementById("item-select");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Show the list of items that match the filters
function showItems() {
  const text = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const status = verifiedSelect.value;

  const matches = items.filter(function (item) {
    const searchable = (item.name + " " + item.era + " " + item.origin).toLowerCase();
    return searchable.includes(text) &&
      (category === "all" || item.category === category) &&
      (status === "all" || item.status === status);
  });

  itemList.innerHTML = "";

  if (matches.length === 0) {
    resultCount.textContent = "No items match. Try a different search or clear the filters.";
    return;
  }

  resultCount.textContent = matches.length + " item(s) found";

  matches.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML =
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.category + ", " + item.era + "</p>" +
      "<p>Origin: " + item.origin + "</p>" +
      "<p class='price'>$" + item.price.toLocaleString() + "</p>" +
      "<p><span class='status " + item.status.toLowerCase() + "'>" +
      (item.status === "Verified" ? "Authenticity verified" : "Authenticity pending") +
      "</span></p>" +
      "<button type='button' data-id='" + item.id + "'>View provenance record</button>";
    itemList.appendChild(card);
  });
}

// Show the full provenance record for one item
function showRecord(id) {
  const item = items.find(function (i) { return i.id === id; });

  let rows = "";
  item.owners.forEach(function (o) {
    rows += "<tr><td>" + o.period + "</td><td>" + o.owner + "</td><td>" + o.source + "</td></tr>";
  });

  recordContent.innerHTML =
    "<h3>" + item.name + "</h3>" +
    "<p><strong>Origin:</strong> " + item.origin + ", " + item.era + "</p>" +
    "<p><strong>Authenticity:</strong> " + item.status + ". " + item.authenticity + "</p>" +
    "<p><strong>Condition:</strong> " + item.condition + "</p>" +
    "<h4>Ownership history</h4>" +
    "<table><tr><th>Period</th><th>Owner</th><th>Source</th></tr>" + rows + "</table>";

  recordSection.hidden = false;
  recordSection.scrollIntoView();
}

// Fill the item drop-down in the contact form
function fillItemSelect() {
  items.forEach(function (item) {
    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  });
}

// Events
searchInput.addEventListener("input", showItems);
categorySelect.addEventListener("change", showItems);
verifiedSelect.addEventListener("change", showItems);

itemList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    showRecord(Number(event.target.dataset.id));
  }
});

closeButton.addEventListener("click", function () {
  recordSection.hidden = true;
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  formMessage.textContent = "Thank you, " + name + ". Your question about " + itemSelect.value + " was sent.";
  contactForm.reset();
});

// Start
fillItemSelect();
showItems();
