class Project {
    constructor(title, desc, tags) {
        this.title = title;
        this.desc = desc;
        this.tags = tags;
    }

    DOM() {
        var tagsDOM = "";
        this.tags.forEach(tag => {
            tagsDOM += `<a class="tag" style="background-color: ${tag.color}; color: ${pickTextColorBasedOnBgColorSimple(tag.color, '#FFFFFF', '#000000')};">${tag.url.split("=")[1]}</a>` // Shut up
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

function CreateProjects() {
    fetch('https://api.github.com/users/squidee100/repos')
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                fetch(`https://raw.githubusercontent.com/squidee100/${repo.name}/${repo.default_branch}/README.md`)
                    .then(res => {
                        if (!res.ok) throw res
                        return res.text();
                    })
                    .then(text => {
                        var res = false;
                        text.split(/\n/).forEach(line => {
                            if (line.search("folio-data") != -1) {
                                res = true;
                                var options = JSON.parse(line.split("folio-data")[1].split("-->")[0].replace(/[\(\)']+/g,''));
                                var tags = [];

                                fetch(`https://api.github.com/repos/squidee100/${repo.name}/languages`)
                                .then(res => {
                                    return res.text();
                                })
                                .then(text => {
                                    obj = JSON.parse(text);
                                    var total = 0;
                                    
                                    for (var key in obj) {
                                        total += parseInt(obj[key], 10); 
                                    }
                                    for (var key in obj) {
                                        obj[key] = (obj[key] / total);
                                        
                                        if (obj[key] > 0.01) {
                                            tags.push(tag[key]);
                                        }
                                    }

                                    projectwrapper.innerHTML += new Project(options.title, options.desc, tags).DOM();
                                });

                                
                                console.log(`Folio data found for '${repo.full_name}'!`);
                            }
                        });
                        if (!res) {
                            console.warn(`No folio data found for '${repo.full_name}'!`);
                        }
                    })
                    .catch((err) => {
                        console.warn(`No README.md found for '${repo.full_name}'!`);
                    });
            });
        });
}

// SudoPlz - https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        darkColor : lightColor;
}

CreateProjects();
