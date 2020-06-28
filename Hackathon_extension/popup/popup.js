const analyze = document.getElementById("analyze");
const url_1 = 'https://reelnewsserver.azurewebsites.net/article';
var info = {
    title : ""
}


//if (analyze) {
  //analyze.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        
        var url = "" + tabs[0].url;
        var url_parts = url.split('.');
        var publisher = url_parts[1];
        var title = "" + tabs[0].title;
        info.title = title;
        // info.publisher = publisher;
        // document.write(`<li>${info.publisher}</li>`);

        const params = {
            //mode: 'no-cors',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({title: info.title}),
            method: "POST" 
        }
        
        
        
        fetch('https://reelnewsserver.azurewebsites.net/article', params).then(res => {
            return res.json()
        }).then(data => {
            document.write(`<h1>The Other Side </h1>`);
            document.write(`<p><em>Articles from across the aisle, powered by <img src="/icon/bing.png"> </em></p><br><br>`);
            document.write(`<ul style="list-style:none;list-style-position: inside; padding-left:0;">`);
        
            for(var i = 0; i < data.length; i++) {
                var str = "" + data[i][0]
                str = str.substring(0, Math.min(str.length, 30 )) + "..."
                var link = str.link(data[i][1])
                document.write(`<li style=" margin-bottom: 10px;"><a href="${data[i][1]}" title="${data[i][0]}">${str}</a> | ${data[i][2]} </li>`) 
                

            }
            document.write(`</ul>`);
            document.body.style.zIndex = 1;
            document.body.style.width = "250px";
            document.body.style.background = "#E6E6E6";
            document.body.style.fontFamily = "Segoe UI";

            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++) {
                (function () {
                    var ln = links[i];
                    var location = ln.href;
                    console.log(location);
                    ln.onclick = function () {
                        chrome.tabs.create({active: true, url: location});
                    };
                })();
            }

            
            
        }).catch(error=>{
            document.write(`<li>${error}</li>`)
        });  

        
    })

//}
//}

