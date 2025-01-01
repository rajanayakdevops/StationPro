const TrainAvailableModel = require("../model/trainAvailable");
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/rootpath");
const { promises } = require("dns");

exports.gethomepage = (req,res,next)=>{
  res.render('homepage',{PageTitle: 'homePage'});
};

exports.postShowTrainDetails = (req,res)=>{
  // console.log(req.body);
  const {from_station,to_station,travel_date} = req.body;

  const travelDetails = new TrainAvailableModel(from_station,to_station,travel_date);

  travelDetails.save();

  
  const from = from_station;
  const to = to_station;
  const date = travel_date;

  let trainDetailsData = [];  

// Store train details
async function storeTrainData(from_station, to_station, travel_date) {
    const data = await TrainAvailableModel.fetchTrainDetails(from_station, to_station, travel_date);
    
    if (Object.keys(data).length > 0) {
        trainDetailsData = data;
        console.log("Data stored successfully:");
    } else {
        console.log("No data to store.");
    }
}
  


let trainJourneyDetails = { data: [] };
async function fetchSeatDetails(fromStationCode, toStationCode, dateOfJourney) {
  
  
  let promises = []; // Array to hold promises

  for (const train of trainDetailsData.data) {
    const { train_number, class_type: seatTiers } = train;

    // Initialize the train data object
    let trainData = {
      train_number: train_number,
      seatInfo: {} // Start with an empty object to hold seat classes
    };

    // For each class of the train, fetch seat availability
    for (const seatTier of seatTiers) {
      

      // Create a new object for each seat class
      let seatClassObj = {
        seatClass: seatTier, // The seat class
      };

      // Create a promise for each API call
      let seatPromise = new Promise((resolve, reject) => {
        TrainAvailableModel.fetchSeatAvailable(seatTier, fromStationCode, toStationCode, train_number, dateOfJourney, (seatAvailable) => {
          // Add seat availability data to the corresponding seat class object
          seatClassObj.seatAvailable = seatAvailable;

          // Add the seat class object to the trainData object inside the seatInfo
          trainData.seatInfo[seatTier] = seatClassObj;

          resolve(); // Resolve the promise when the API call is complete
        });
      });

      // Push each seatPromise to the promises array
      promises.push(seatPromise);
    }

    // After looping over all seat classes, push the trainData object to the result
    // This ensures that the seatInfo object contains separate entries for each seat class
    await Promise.all(promises); // Wait for all promises for this train to resolve
    trainJourneyDetails.data.push(trainData); // Push the trainData after all promises are resolved
  }

  console.log("All API calls completed:");
  return trainJourneyDetails; // Return the result after all API calls are completed
}



 // Get stored train details
function getTrainData() {
  if ( trainDetailsData.length === 0 && trainJourneyDetails.length === 0 ) {
      console.log("array is empty ");
      return res.render("showTrainDetails", {
        traindetails: [],
        trainJourneyDetails: [],
        errorMessage: "No trains available for the selected route and date.",
        PageTitle: 'trainSearchResult',
      });
    }
    console.log("trainJourneyDetails : ", JSON.stringify(trainJourneyDetails));
    return res.render("showTrainDetails", {
      traindetails: trainDetailsData,
      trainJourneyDetails: trainJourneyDetails,
      errorMessage: "",
      PageTitle: 'trainSearchResult',
    });
}


// function call 
(async () => {
  await storeTrainData(from,to,date);  // Store data
  fetchSeatDetails(from,to,date)
.then(result => {
  trainJourneyDetails = result.data;

  getTrainData();
})
.catch(error => {
  console.error("Error fetching seat details:", error);
});

    
})();
  
  

};