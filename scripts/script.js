const tableBody = document.querySelector('tbody');
const filteredBy = document.getElementById('filter');
const wcagVersion = document.getElementById('wcagVersion');
let selectedLevels = [], selectedVersions = [], selectedCategory = [];
let uniqeLevels = [
	// Filter Uniqu Levels
	...new Set([
		...wcagObj['tests'].map(x => x.wcagLevel),
		// Keep at lease this levels
		'A',
		'AA',
		'AAA'
	])
];
// Filter Uniqu Versions
let uniqeLVersions = [
	...new Set([
		...wcagObj['tests'].map(x => x.wcagVersion),
		// Keep at least this versions
		'2.0',
		'2.1',
		'2.2',
	])
];
// Filter Uniqu Categories
let uniqeCategories = [...new Set(wcagObj['tests'].map(x => x.category).flat())];

// Create and Show Levels in HTML
uniqeLevels.forEach(level => {
	document.getElementById('levels').innerHTML += `
	<div>
		<input id="level_${level}" name="${level}" onchange="levelFilter(event)" class="form-check-input level-selector"
		type="checkbox">
		<label for="level_${level}" for="flexCheckDefault">
		${level}
		</label>
	</div>
	`
})

// Create and Show Versions in HTML
uniqeLVersions.forEach(version => {
	document.getElementById('versions').innerHTML += `
	<div>
		<input id="version_${version}" name="${version}" onchange="versionFilter(event)"
			class="form-check-input version-selector" type="checkbox">
		<label for="version_${version}" for="flexCheckDefault">
			${version}
		</label>
	</div>
	`
})

// Create and Show Categories in HTML
uniqeCategories.forEach(category => {
	document.getElementById('categories').innerHTML += `
	<div>
		<input id="category_${category}" name="${category}" onchange="categoryFilter(event)"
			class="form-check-input category-selector" type="checkbox">
		<label for="category_${category}" for="flexCheckDefault">
			${category}
		</label>
	</div>
	`
})

// Show filtered by
function showFiltersOnUI() {
	let filterEl = document.getElementById('filter');
	filterEl.innerHTML = [selectedLevels, selectedVersions, selectedCategory].flat().join(', ') || '------'
}

// Create Table Row for each data
function populateTable(obj) {
	showFiltersOnUI();
	tableBody.innerHTML = '';
	const resultsElement = document.getElementById('returnedResults');
	const tests = obj['tests'];
	var returnedResults = 0;

	wcagVersion.textContent = obj.latestWCAGversion;

	for (let i = 0; i < tests.length; i++) {
		const tableRow = document.createElement('tr');
		for (var key in tests[i]) {
			if (tests[i].hasOwnProperty(key)) {
				if (key !== 'link') {
					var val = tests[i][key];
					var tableData = document.createElement('td');
					// Joined Filter Condition for Levels, Versions and Categories
					let filterCondition =
						// If any level, version or category selected check the data matched with the selections
						(!selectedLevels.length || selectedLevels.indexOf(tests[i].wcagLevel) >= 0) &&
						(!selectedVersions.length || selectedVersions.indexOf(tests[i].wcagVersion) >= 0) &&
						(!selectedCategory.length || selectedCategory.filter(x => tests[i].category.indexOf(x) >= 0).length)
					// Keep data if matched with the filer condition the show it in table
					if (filterCondition) {
						if (key == 'category') {
							returnedResults++;
							for (let a = 0; a < tests[i][key].length; a++) {
								var cssSpan = document.createElement('span');
								cssSpan.textContent = val[a];

								cssSpan.classList.add('badge-soft-primary');
								cssSpan.classList.add('badge');
								cssSpan.classList.add('rounded-pill');
								tableData.appendChild(cssSpan);
							}
						}
						else {
							if (key == 'successCriteria') {
								const a = document.createElement('a');
								const linkText = document.createTextNode(val);
								a.appendChild(linkText);
								a.title = val
								a.target = '_blank';
								a.href = tests[i].link;

								tableData.appendChild(a);
							}
							else if (key == 'test') {
								const spanEl = document.createElement('span');
								// Create URL and, or, strong from text and insert into span node
								spanEl.innerHTML = urlify(tests[i].test)
								// Create or, with HTML element wrap
								.replace('or, ', '<strong>or, </strong>')
								// Create and, with HTML element wrap
								.replace('and, ', '<strong>and, </strong>')
								// Append Child into table data (td)
								tableData.appendChild(spanEl);
							}
							else {
								// Level style by DOM Element
								switch (val) {
									case 'A':
										var cssSpan = document.createElement('span');
										cssSpan.textContent = val;
										cssSpan.classList.add('badge-soft-success');
										cssSpan.classList.add('badge');
										cssSpan.classList.add('rounded-pill');
										tableData.appendChild(cssSpan);
										break;
									case 'AA':
										var cssSpan = document.createElement('span');
										cssSpan.textContent = val;
										cssSpan.classList.add('badge-soft-danger');
										cssSpan.classList.add('badge');
										cssSpan.classList.add('rounded-pill');
										tableData.appendChild(cssSpan);
										break;
									default:
										tableData.textContent = val;
										break;
								}
							}
						}
						// Adding row in HTML table
						tableRow.appendChild(tableData);
						tableBody.appendChild(tableRow);
					}
				}
			}
		}

	}
	resultsElement.textContent = returnedResults;
}

// Getting selected levels
function levelFilter(e) {
	let allLevelCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedLevels = Array.from(allLevelCheckboxes).filter(x => x.checked).map(x => x.name);
	// console.log(selectedLevels)
	populateTable(wcagObj);
}

// Getting selected versions
function versionFilter(e) {
	let allVersionCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedVersions = Array.from(allVersionCheckboxes).filter(x => x.checked).map(x => x.name);
	// console.log(selectedVersions)
	populateTable(wcagObj);
}

// Getting selected categories
function categoryFilter(e) {
	let allCategoryCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedCategory = Array.from(allCategoryCheckboxes).filter(x => x.checked).map(x => x.name);
	// console.log(selectedCategory)
	populateTable(wcagObj);
}

// Show table with all data
populateTable(wcagObj, 'all');

// Create URL from text
function urlify(text) {
	let urlRegex = /(https?:\/\/[^\s]+)/g;
	return text
		// Reglar Expression Used
		// < and > are HTML keyword, so replace those by changing HTML scape
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		// replace url to HTML element
		.replace(urlRegex, function (url) {
			return '<a href="' + url + '">' + url + '</a>';
		})
}
