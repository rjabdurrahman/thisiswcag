const tableBody = document.querySelector('tbody');
const filteredBy = document.getElementById('filter');
const wcagVersion = document.getElementById('wcagVersion');
let selectedLevels = [], selectedVersions= [], selectedCategory=[];

function populateTable(obj)
{
	tableBody.innerHTML = '';
	const resultsElement = document.getElementById('returnedResults');
	const tests = obj['tests'];
	var returnedResults = 0;
	
	wcagVersion.textContent = obj.latestWCAGversion;
	
	for(let i = 0;i < tests.length; i++)
	{
		const tableRow = document.createElement('tr');
		for (var key in tests[i]) 
		{
			if (tests[i].hasOwnProperty(key)) 
			{
				if(key!=='link')
				{	
					var val = tests[i][key];
					var tableData = document.createElement('td');
					let filterCondition = 
					(!selectedLevels.length || selectedLevels.indexOf(tests[i].wcagLevel) >= 0) && 
					(!selectedVersions.length || selectedVersions.indexOf(tests[i].wcagVersion) >= 0) &&
					(!selectedCategory.length || selectedCategory.filter(x => tests[i].category.indexOf(x) >= 0).length )
					// Work Here
					if(filterCondition)
					{
						if(key=='category')
						{
							returnedResults++;
							for(let a = 0;a < tests[i][key].length; a++)
							{
								var cssSpan = document.createElement('span');
								cssSpan.textContent = val[a];
								
								cssSpan.classList.add('badge-soft-primary');
								cssSpan.classList.add('badge');
								cssSpan.classList.add('rounded-pill');
								tableData.appendChild(cssSpan);
							}
						}
						else
						{
							if(key=='successCriteria')
							{
								const a = document.createElement('a');
								const linkText = document.createTextNode(val);
								a.appendChild(linkText);
								a.title = val
								a.target = '_blank';
								a.href = tests[i].link;
								
								tableData.appendChild(a);
							}
							else
							{
								switch(val)
								{
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

function levelFilter(e){
	let allLevelCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedLevels = Array.from(allLevelCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}

function versionFilter(e){
	let allVersionCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedVersions = Array.from(allVersionCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}

function categoryFilter(e){
	let allCategoryCheckboxes = document.querySelectorAll("." + e.target.classList[1])
	selectedCategory = Array.from(allCategoryCheckboxes).filter(x => x.checked).map(x => x.name);
	console.log(selectedLevels, selectedVersions, selectedCategory)
	populateTable(wcagObj);
}
const hashstring = window.location.hash;
switch(hashstring.replace('#',''))
{	
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
		populateTable(wcagObj, hashstring.replace('#',''));
		break;
	default:
		populateTable(wcagObj, 'all');
		break;
}
