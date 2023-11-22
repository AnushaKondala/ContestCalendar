//made contestData and img variables as global coz these are used in different funcs
const contestData = []; //storing each contest data got from api so that this data can be used for filtering.
//for generating imgs
let img = new Array(
    "https://www.cecs.ucf.edu/web/wp-content/uploads/2022/05/UCF_Computer-Programming.jpg",
    "https://cdn.sanity.io/images/tlr8oxjg/production/9f15109746df254c5a030a7ba9239f8a4bb5dadb-1456x816.png?w=3840&q=100&fit=clip&auto=format",
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?cs=srgb&dl=pexels-kevin-ku-577585.jpg&fm=jpg",
    "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?cs=srgb&dl=pexels-markus-spiske-4439901.jpg&fm=jpg",
    "https://contentstatic.techgig.com/photo/74969192/how-coding-competitions-are-significant-in-a-developers-career.jpg?798505",
    "https://thejournal.com/-/media/EDU/THEJournal/2019-Images-Editorial/20190829CoderZcompetition.jpg",
    "https://www.azcentral.com/gcdn/-mm-/45fabd89f11de1d8889d72046d582b3b53ec558d/c=0-280-5510-3393/local/-/media/2017/04/07/Phoenix/Phoenix/636271883793225849-SPARK-App-League-3.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlD0DaEwpuWobjttySXEjlnucusWC9GHrCSBaT7lSkH2xADMYuPFAuykGMCTZHkEafTS8&usqp=CAU",
)
function fetchAndDisplayOriginalData() { //we created this func bcoz same data needs to be displayed on clicking home
    //after filtering data by clicking search so after this it needs to get back to original data
    if (contestData.length > 0) { // we can directly get original information displayed this avoids storing of 
        //contest details again which was already stored on initial load of web page.
        displayContestData(contestData); // calling the func which displays data
    }
    else {
        //search free api u get github api go to programming sec url name is KONTESTS
        let url = "https://kontests.net/api/v1/all";
        let response = fetch(url);
        response.then((responseData) => {
            return responseData.json();
        }).then((contest) => {
            //  console.log(contest);

            for (item in contest) {
                let eachContestDetails = {      //storing a contest details in a variable 
                    "name": contest[item].name,
                    "url": contest[item].url,
                    "site": contest[item].site,
                    "status": contest[item].status,
                    "start_time": contest[item].start_time,
                    "end_time": contest[item].end_time,
                    "in_24_hours": contest[item].in_24_hours

                };
                contestData.push(eachContestDetails);//each contest is getting stored in contestData
                //storing contest details in contestData coz this data later used in filter where filtering of data req.
            }
            displayContestData(contestData);
        });
    }
}
fetchAndDisplayOriginalData();
function displayContestData(contestData) {
    let cards = "";
    //iterating over contestData and display each items property on cards
    for (let item of contestData) {
        let randomImg = Math.floor(Math.random() * img.length);// for random image
        cards += `
            <div class="card mx-2 my-2 shadow" style="width: 22rem;">
                <div class="card-body d-flex flex-column">
                <img src="${img[randomImg]}" class="card-img mb-2" alt="..." style="height: 10rem;">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Site: ${item.site} <b>Status: ${item.status}</b></p>
                    <p class="card-text">Starts: ${item.start_time}</p>
                    <p class="card-text">Ends: ${item.end_time}</p>
                    <p class="card-text">In 24 hrs? ${item.in_24_hours}</p>
                    <a href="${item.url}" class="align-self-center btn btn-primary" style="margin-top: auto;">Visit</a>
                </div>
            </div>
            `
    }
    document.getElementById('cardContainer').innerHTML = cards;
}
function filter(event) {
    event.preventDefault(); //to avoid page reloading
    // console.log("hi");
    let searchInput = document.getElementById('search').value.toLowerCase();
    document.getElementById('search').value = ""; //after search the search bar should be empty
    // console.log(searchInput);
    if (searchInput != "hackerrank" && searchInput != "hackerearth" && searchInput != "leetcode"
        && searchInput != "atcoder" && searchInput != "topcoder" && searchInput != "codeforces"
        && searchInput != "codechef" && searchInput != "sites" && searchInput != "csacademy") {
        alert("enter proper sitename. Sitenames can be hackerrank,hackerearth,leetcode,atcode,topcoder,codeforces, codechef,sites,csacademy");
    }
    else {
        let filteredContest = contestData.filter((contest) => {
            // console.log(contest);
            return contest.site.toLowerCase().includes(searchInput); //creating filteredContest which contains details 
            //of only given searchInput
        });
        // console.log(filteredContest.length);
        for (let item of filteredContest) {
            console.log(item);
        }
        // console.log(filteredContest);
        let eachContestItem = "";
        if (filteredContest.length == 0) {
            eachContestItem += `<h5 style="font-size: 4vw">There are no contest available right now in ${searchInput}</h5>`
        }
        else {
            for (let item of filteredContest) {
                let randomImg = Math.floor(Math.random() * img.length)
                //displaying filteredcontest details
                eachContestItem += `
        <div class="card mx-2 my-2 shadow" style="width: 22rem !important;">
            <div class="card-body d-flex flex-column">
            <img src="${img[randomImg]}" class="card-img mb-2" alt="..." style="height:10rem;">
            <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Site: ${item.site} <b>Status: ${item.status}</b></p>
                <p class="card-text">Starts: ${item.start_time}</p>
                <p class="card-text">Ends: ${item.end_time}</p>
                <p class="card-text">In 24 hrs? ${item.in_24_hours}</p>
                <a href="${item.url}" class="align-self-center btn btn-primary" style="margin-top:auto;">Visit</a>
            </div>
        </div>`
            }
        }
        document.getElementById('cardContainer').innerHTML = eachContestItem;
    }
}
document.getElementById('home').addEventListener('click', (event) => {
    //on clicking home to prevent page loading
    event.preventDefault();
    //calling following func to load original data
    fetchAndDisplayOriginalData();

});
/*How i made this js code step by step explanation for future reference*/
//step 1: fetching data from api so written fetch api code and since we need the data obtained to be
//displayed used cards code
//step 2: filter func while writing filter func contestData was required so created contestData in fetch api code
// made contestData global since it was needed by both the funcs
//step 3: its time after filter option on clicking home it should again display original code
//after clicking on home again fetch api code needs to be used
//made a func put that code in fetchAndDisplayOriginalData() calling it in js code and calling it on clicking home
//but there is a problem fetching same data again from api and displaying data is repetitive
//and another problem was again same info gets stored in contestData now contestData will have duplicates
//to avoid this if there is already data in contestData indicates data already got fetched so display only cards data
//on clicking home and inital pg load both times cards data needs to be displayed so cards data is written in another func.
//step 4: on clicking home directly we can call func using onclick=func(event) since we were using same func on initial
//load and clicking home on initial load it doesn;t req event so to avoid para differnces used event listeners. and
//called func .