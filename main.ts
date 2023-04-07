const main = document.querySelector("main");
const filterDiv = document.querySelector(".jobSection__filter");
const clearButton = document.querySelector(".jobSection__filter--Clear");
const selectedTags: string[] = [];
const filter = () =>{
  const allJobs = document.querySelectorAll(".jobSection__offer");
	allJobs.forEach((offer) => {
		const allJobsTagSection = offer.lastChild;
		const allJobsTagSectionChilderns = allJobsTagSection?.childNodes;
		const allJobsTagSectionChildernsArrays = [
			...(allJobsTagSectionChilderns as any),
		];
		const allJobsTagSectionChildernsStrings: string[] = [];
		allJobsTagSectionChildernsArrays.forEach((item) => {
			allJobsTagSectionChildernsStrings.push(item.innerHTML);
		});
    const checkForTags = selectedTags.every((item) =>{
          return allJobsTagSectionChildernsStrings.includes(item);
    });
    

	
    checkForTags
			? ((offer as HTMLElement).style.display = "flex")
			: ((offer as HTMLElement).style.display = "none");
	});
}
const generateTag = (tagName: string) => {
  selectedTags.push(tagName);
	const jobSectionFilterTag = document.createElement("div");
	jobSectionFilterTag.className = "jobSection__filter--tag";
	jobSectionFilterTag.innerHTML = tagName;

	const jobSectionFilterDelete = document.createElement("div");
	jobSectionFilterDelete.className = "jobSection__filter--delete";

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "14");
	svg.setAttribute("height", "14");

	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("fill", "#FFF");
	path.setAttribute("fill-rule", "evenodd");
	path.setAttribute(
		"d",
		"M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
	);

	svg.appendChild(path);
	jobSectionFilterDelete.appendChild(svg);
	jobSectionFilterTag.appendChild(jobSectionFilterDelete);
	filterDiv?.prepend(jobSectionFilterTag);
	jobSectionFilterDelete.addEventListener("click", () => {
		jobSectionFilterTag.remove();
    const test = selectedTags.indexOf((jobSectionFilterTag.innerText as any));
      if (test == 0) {
				selectedTags.shift();
			}
    selectedTags.splice(test, test);
    filter();
	});
	filter();
};

const render = (
	id: number,
	company: string,
	logo: string,
	newv: boolean,
	featured: boolean,
	position: string,
	role: string,
	postedAt: string,
	contract: string,
	location: string,
	languages: string[],
	tools: string[]
) => {
	const exampleDiv = document.createElement("div");
	exampleDiv.classList.add("jobSection__offer");

	const imgDiv = document.createElement("div");
	imgDiv.classList.add("jobSection__Img");

	const img = document.createElement("img");
	img.src = logo;

	imgDiv.appendChild(img);

	const infoDiv = document.createElement("div");
	infoDiv.classList.add("jobSection__informations");

	const companyNameDiv = document.createElement("div");
	companyNameDiv.classList.add("companyname_div");
	const companySpan = document.createElement("span");
	const companyNameP = document.createElement("p");
	companyNameP.classList.add("jobSection__informations--companyName");
	companyNameP.textContent = company;
	companySpan.appendChild(companyNameP);
	if (newv) {
		const companyNameNew = document.createElement("p");
		companyNameNew.classList.add("new");
		companyNameNew.textContent = "NEW!";
		companySpan.appendChild(companyNameNew);
	}
	if (featured) {
		const companyNameFeat = document.createElement("p");
		companyNameFeat.classList.add("featured");
		companyNameFeat.textContent = "FEATURED!";
		companySpan.appendChild(companyNameFeat);
	}

	companyNameDiv.appendChild(companySpan);

	const positionP = document.createElement("p");
	positionP.classList.add("jobSection__informations--position");
	positionP.textContent = position;

	const jobDetailsDiv = document.createElement("div");
	jobDetailsDiv.classList.add("jobSection__informations--details");
	jobDetailsDiv.textContent = `${postedAt} · ${contract} · ${location}`;
	infoDiv.appendChild(companyNameDiv);
	infoDiv.appendChild(positionP);
	infoDiv.appendChild(jobDetailsDiv);

	const tagsDiv = document.createElement("div");
	tagsDiv.classList.add("jobSection__tags");

	const tags = languages;
	tools.forEach((element) => {
		tags.unshift(element);
	});
	tags.unshift(role);
	tags.forEach((tag) => {
		const tagDiv = document.createElement("div");
		tagDiv.addEventListener("click", () => {
			generateTag(tag);
		});
		tagDiv.textContent = tag;
		tagsDiv.appendChild(tagDiv);
	});

	exampleDiv.appendChild(imgDiv);
	exampleDiv.appendChild(infoDiv);
	exampleDiv.appendChild(tagsDiv);
	main?.appendChild(exampleDiv);
};

async function printData() {
	const response = await fetch("data.json");
	const json = await response.json();
	json.forEach(
		({
			id,
			company,
			logo,
			newv,
			featured,
			position,
			role,
			postedAt,
			contract,
			location,
			languages,
			tools,
		}: {
			id: number;
			company: string;
			logo: string;
			newv: boolean;
			featured: boolean;
			position: string;
			role: string;
			level: string;
			postedAt: string;
			contract: string;
			location: string;
			languages: Array<string>;
			tools: Array<string>;
		}) => {
			render(
				id,
				company,
				logo,
				newv,
				featured,
				position,
				role,
				postedAt,
				contract,
				location,
				languages,
				tools
			);
		}
	);
}
printData();

clearButton?.addEventListener("click", () => {
  selectedTags.length = 0;
	const filterTagsToDelete = document.querySelectorAll(
		".jobSection__filter--tag"
	);
	filterTagsToDelete.forEach((element) => {
		filterDiv?.removeChild(element);
	});
  filter();
});
