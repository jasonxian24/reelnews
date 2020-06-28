const analyze = document.getElementById("analyze");
const url = 'https://reelnewsserver.azurewebsites.net/article';
var info = {
    title : ""
}

if (analyze) {
  analyze.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        document.write(`<h3>Current Tab Info: <h3>`);
        document.write(`<ul>`);
        var url = "" + tabs[0].url;
        var url_parts = url.split('.');
        var publisher = url_parts[1];
        var title = "" + tabs[0].title;
        info.title = title;
        // info.publisher = publisher;
        // document.write(`<li>${info.publisher}</li>`);
        document.write(`<li>${info.title}</li>`);
        
        fetch(url, {body: {title : "Microsoft"}, method: "POST"
        }).then(res => {
            return res
        }).then(data => {
            document.write(`<li>${data[0]}</li>`)
        }).catch(error=>{
            document.write(`<li>${error}</li>`)
        });  

        document.write(`<ul>`);

    })
}
}

