const tableBody = document.querySelector('tbody');
const filteredBy = document.getElementById('filter');
const wcagVersion = document.getElementById('wcagVersion');

function populateTable(obj, filter)
{
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

					if(tests[i].category.includes(filter) || filter == 'all')
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

const btns = document.querySelectorAll('button:not([type=submit]).filter');
for (i of btns) {
  i.addEventListener('click', function(){
	tableBody.innerHTML = '';
	populateTable(wcagObj,this.textContent);
	filteredBy.textContent = this.textContent;
  });
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
