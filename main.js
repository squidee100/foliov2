tag = {
    html: {
        title: "HTML",
        color: "white",
        backgroundColor: "#E86235"
    },
    js: {
        title: "JavaScript",
        color: "black",
        backgroundColor: "#F7E14B"
    },
    cs: {
        title: "C#",
        color: "white",
        backgroundColor: "blue"
    },
}

class Project {
    constructor(title, desc, tags) {
        this.title = title;
        this.desc = desc;
        this.tags = tags;
    }

    DOM() {
        var tagsDOM = "";
        this.tags.forEach(tag => {
            tagsDOM += `<a class="tag" style="background-color: ${tag.backgroundColor}; color: ${tag.color};">${tag.title}</a>`
        });

        return `
            <div class="project">
                <div id="tagwrapper">
                    ${tagsDOM}
                </div>
                <h1 title="${this.title}">${this.title}</h1>
                <span>${this.desc}</span>
            </div>
        `
    }
}

const projectwrapper = document.getElementById("projectwrapper");

projectwrapper.innerHTML += new Project("my project", "epic description", [tag.js]).DOM();
projectwrapper.innerHTML += new Project("my other project", "epic description", [tag.html, tag.js]).DOM();
projectwrapper.innerHTML += new Project("epic game", "epic description", [tag.html, tag.js]).DOM();
projectwrapper.innerHTML += new Project("epic game remastered", "epic description", [tag.html, tag.js]).DOM();
projectwrapper.innerHTML += new Project("??????????????????????????????????????????????????????????????????????????????", "epic description", [tag.html, tag.js]).DOM();
