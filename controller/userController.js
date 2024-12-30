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
      console.log("passing the train details ");
      return res.render("showTrainDetails", {
        traindetails: trainDetailsData,
        errorMessage: "",
        PageTitle: 'trainSearchResult',
      });
}

// Example usage
(async () => {
    await storeTrainData(from,to,date);  // Store data
    getTrainData();  // get train detail 
})();



 
  
  

};