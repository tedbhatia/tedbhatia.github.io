$("#login-button").click(function(event){
    event.preventDefault();

$('form').fadeOut(500);
$('.wrapper').addClass('form-success');
});

let navbarHeight;
	
function computeNavbarHeight() {
	navbarHeight = getComputedStyle(document.querySelectorAll('.navbar')[0]).height;
	document.querySelectorAll('.topmost-container')[0].style.overflow = 'auto';
	document.querySelectorAll('.topmost-container')[0].style.minHeight = document.querySelectorAll('.topmost-container')[0].style.height = 'calc(100vh - ' + navbarHeight + ')';
	document.querySelectorAll('.topmost-container')[0].style.zIndex = '-1';
}

function selectActiveNavLink(linkIdCssSelector) {
	document.querySelectorAll('.nav-link').forEach(node => {
		node.classList.remove('active');
	});
	document.querySelector('#' + linkIdCssSelector).classList.add('active');
}

// functions for DOM manipulation, e.g. apply the document title, name of the person, projects, etc. /////////////////////////////////////////////////////////////////////////////////////////////////////////

function applyDOMManipulation(elementId, innerHtmlValue) {
	document.querySelector('#' + elementId).innerHTML = innerHtmlValue;
}

function configureDocumentTitle() {
	const elementId = 'title';
	const titleTextSuffix = ' - Portfolio';
	const titleText = personalDetails.firstName + ' ' + personalDetails.lastName;
	applyDOMManipulation(elementId, titleText + titleTextSuffix);
}

function configureNameInHome() {
	const elementId = 'homeSectionDisplayName';
	const name = personalDetails.firstName + ' ' + personalDetails.middleName + ' ' + personalDetails.lastName;
	applyDOMManipulation(elementId, name);
}

function configureRepoLinks() {
	const anchorIds = Object.keys(reposAndProfessionalAccounts);
	anchorIds.forEach(anchorId => {
		// each key in the reposAndProfessionalAccounts object is actually the same as the id assigned to the anchor tags in the html file. Use keys as ids for query selector, and their corresponding values as the href of anchor tags
		document.querySelector('#' + anchorId).href = reposAndProfessionalAccounts[anchorId];
	});
}

function setBioText() {
	applyDOMManipulation('bioText', aboutMeDetails.bio);
}

function setTimelineItems() {
	aboutMeDetails.timeline.forEach((timelineItem, index) => {
		const timelineItemDiv = document.createElement('div');
		timelineItemDiv.setAttribute('class', 'container-tl ' + (index % 2 === 0 ? 'left' : 'right'));
		
		// create the date div and append to parent
		const dateDiv = document.createElement('div');
		dateDiv.setAttribute('class', 'date');
		dateDiv.innerHTML = timelineItem.date;
		timelineItemDiv.appendChild(dateDiv);
		
		// create the icon and append to parent
		const icon = document.createElement('i');
		icon.setAttribute('class', 'icon fa fa-home');
		timelineItemDiv.appendChild(icon);
		
		// create the content div and append to parent
		const contentDiv = document.createElement('div');
		contentDiv.setAttribute('class', 'content');
		const h2 = document.createElement('h2');
		h2.innerHTML = timelineItem.title;
		contentDiv.appendChild(h2);
		const p = document.createElement('p');
		p.innerHTML = timelineItem.content;
		contentDiv.appendChild(p);
		timelineItemDiv.appendChild(contentDiv);
		
		// add the configured timeline item div to the container div
		document.querySelector('#timelineContainerDiv').appendChild(timelineItemDiv);
	});
}

// helper function to be reused so that code duplication can be reduced for the configureTechnicalAndSoftSkills method
function createSkillDivElement(skillSet, parentContainerId) {
	skillSet.forEach(skill => {
		const skillDiv = document.createElement('div');
		skillDiv.setAttribute('class', 'progressBar');
		
		// create h4 with skill name and append to parent div
		const h4 = document.createElement('h4');
		h4.innerHTML = skill.skillName;
		skillDiv.appendChild(h4);
		
		// create progressBar container and value, and append to parent div
		const progressBarContainer = document.createElement('div');
		progressBarContainer.setAttribute('class', 'progressBarContainer');
		const progressBarValue = document.createElement('div');
		progressBarValue.setAttribute('class', 'progressBarValue value-' + skill.levelOfExpertise);
		progressBarContainer.appendChild(progressBarValue);
		skillDiv.appendChild(progressBarContainer);
		
		// append the skillDiv div element to the parent container having the specified id parentContainerId
		document.querySelector('#' + parentContainerId).appendChild(skillDiv);
	});
}

function configureTechnicalAndSoftSkills() {
	const technicalSkills = skills.technicalSkills;
	const softSkills = skills.softSkills;
	
	createSkillDivElement(technicalSkills, 'one-panel');
	createSkillDivElement(softSkills, 'two-panel');
}

// start calling the DOM manipulation functions from here ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

setTimeout(() => {
	configureDocumentTitle();
	configureNameInHome();
	configureRepoLinks();
	setBioText();
	setTimelineItems();
	configureTechnicalAndSoftSkills();
}, 100);