const analyze = document.getElementById("analyze");
const url_1 = 'https://reelnewsserver.azurewebsites.net/article';
var info = {
    title : ""
}

if (analyze) {
  analyze.onclick = function() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        document.write(`<h3>Recommended Articles: </h3>`);
        document.write(`<ul>`)
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
            for(var i = 0; i < data.length; i++) {
                var str = "" + data[i][0] + '-' + data[i][2]
                var link = str.link(data[i][1])
                document.write(`<li>${link}</li>`) 
                

            }
            
        }).catch(error=>{
            document.write(`<li>${error}</li>`)
        });  


        document.write(`<ul>`)

        

    })
}
}

