const tableBody = document.querySelector('tbody');
const filteredBy = document.getElementById('filter');
const wcagVersion = document.getElementById('wcagVersion');
let selectedLevels = [], selectedVersions = [], selectedCategory = [];
// Filter Uniqu Values
let uniqeLevels = [
	...new Set([
		...wcagObj['tests'].map(x => x.wcagLevel),
		'A',
		'AA',
		'AAA'
	])
];
let uniqeLVersions = [
	...new Set([
		...wcagObj['tests'].map(x => x.wcagVersion),
		'2.0',
		'2.1',
		'2.2',
	])
];
let uniqeCategories = [...new Set(wcagObj['tests'].map(x => x.category).flat())];

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

function populateTable(obj) {
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
					let filterCondition =
						(!selectedLevels.length || selectedLevels.indexOf(tests[i].wcagLevel) >= 0) &&
						(!selectedVersions.length || selectedVersions.indexOf(tests[i].wcagVersion) >= 0) &&
						(!selectedCategory.length || selectedCategory.filter(x => tests[i].category.indexOf(x) >= 0).length)
					// Work Here
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
							else {
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
						tableRow.appendChild(tableData);
						tableBody.appendChild(tableRow);
					}
				}
			}
		}

	}
	resultsElement.textContent = returnedResults;
}

function levelFilter(e) {
	let allLevelCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedLevels = Array.from(allLevelCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}

function versionFilter(e) {
	let allVersionCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedVersions = Array.from(allVersionCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}

function categoryFilter(e) {
	let allCategoryCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedCategory = Array.from(allCategoryCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}
const hashstring = window.location.hash;
switch (hashstring.replace('#', '')) {
	case 'dynamic-content':
	case 'custom-controls':
	case 'forms-and-UI':
	case 'audio-video':
	case 'structure':
	case 'colour':
	case 'content':
	case 'keyboard':
	case 'link':
	case 'font-size':
		populateTable(wcagObj, hashstring.replace('#', ''));
		break;
	default:
		populateTable(wcagObj, 'all');
		break;
}
