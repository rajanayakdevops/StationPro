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

// Get stored train details
function getTrainData() {
    if (!trainDetailsData || trainDetailsData.length === 0) {
        console.log("array is empty ");
        return res.render("showTrainDetails", {
          traindetails: [],
          errorMessage: "No trains available for the selected route and date.",
          PageTitle: 'trainSearchResult',
        });
      }
      for (const train of trainDetailsData.data) {
        console.log('Class Type:', JSON.stringify(train.class_type));  // Log the entire object
      }
   
      
      
      
      return res.render("showTrainDetails", {
        traindetails: trainDetailsData,
        errorMessage: "",
        PageTitle: 'trainSearchResult',
      });
}

// Example usage
(async () => {
    await storeTrainData(from,to,date);  // Store data
    fetchSeatDetails(from,to,date);
    getTrainData();  // get train detail 
})();


    
   function fetchSeatDetails(fromStationCode,toStationCode,dateOfJourney){
    let result = {data:[]};
  let pendingCalls = 0;
  for (const train of trainDetailsData.data) {
    const { train_number, class_type: seatTiers } = train;
    let newObj = {};
    newObj.train_number = train_number;

    // For each class of the train, fetch seat availability
    for (const seatTier of seatTiers) {
      pendingCalls++;

    TrainAvailableModel.fetchSeatAvailable(seatTier,fromStationCode,toStationCode,train_number,dateOfJourney,(seatAvailable)=>{
        
        // in this the result is having the details of a single train number with corresonding seat availabe 

        let seatInfoObj = {}; // New object for each seatTier response
        seatInfoObj.seatClass = seatTier;
        seatInfoObj.seatAvailable = seatAvailable;
        
        // Add the seat information to the new object
        newObj.seatInfo = seatInfoObj;

        result.data.push(newObj); // Push the new object to the result array

        pendingCalls--;

        if (pendingCalls === 0) {
          console.log("All API calls completed:");
          return result;
        }
        
      })
    }
  }
  
 
  
}

 
  
  

};