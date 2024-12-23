const TrainAvailableModel = require("../model/trainAvailable");
const fs = require('fs');
const path = require('path');
const rootDir = require("../utils/rootpath");

exports.gethomepage = (req,res,next)=>{
  res.render('homepage',{PageTitle: 'homePage'});
};

exports.postShowTrainDetails = (req,res)=>{
  // console.log(req.body);
  const {from_station,to_station,travel_date} = req.body;

  const travelDetails = new TrainAvailableModel(from_station,to_station,travel_date);

  travelDetails.save();
  
  const from = travelDetails.from_station;
  const to = travelDetails.to_station;
  const date = travelDetails.travel_date;

  TrainAvailableModel.fetchTrainDetails(from, to, date, (traindetails) => {

    if (!traindetails || traindetails.length === 0) {
      return res.render("showTrainDetails", {
        traindetails: [],
        errorMessage: "No trains available for the selected route and date.",
        PageTitle: 'trainSearchResult',
      });
    }



   const sortedDetailsDataPath = path.join(rootDir,'Data','sortedDetails');

   const sortedDetails = traindetails.data.map(train => {
      // Create a new object with only the relevant keys
      return {
        train_number: train.train_number,
        train_name: train.train_name,
        train_number: train.train_number,
        train_type: train.train_type,
        from: train.from,
        from_std: train.from_std,
        to: train.to,
        to_sta: train.to_sta,
        train_date: train.train_date
    
      };
    });

    fs.writeFile(sortedDetailsDataPath,JSON.stringify(sortedDetails),(error)=>{
      if(error){
        console.log("error while writing the sorteDetails ", error);
      }
      console.log("file write success in the sortedDetails");
      
    });

    const trainNumbers = sortedDetails.map(element =>{
      return { 
        train_number: element.train_number
      }
    });
    

    console.log(trainNumbers);

    const seatClassAvailable = async () => {
      const seatDetailsArray = await Promise.all(
        trainNumbers.map(async (element) => {
          return new Promise((resolve, reject) => {
            TrainAvailableModel.fetchTrainAvailClasses(element, (seatDetails) => {
              if (!seatDetails || seatDetails.data === 0) {
                console.log("empty seatDetails  returning empty object");
                resolve({});  
              } else {
                resolve({
                  train_number: seatDetails.data.trainNumber,
                  train_name: seatDetails.data.trainName,
                  class: seatDetails.data.class
                });
              }
            });
          });
        })
      );
    
      return seatDetailsArray;
    };

    const seatDetailsDataPath = path.join(rootDir,'Data','seatDetailsDataPath');

    seatClassAvailable().then((seatDetailsArray) => {
      console.log(JSON.stringify(seatDetailsArray)); 
      fs.writeFile(seatDetailsDataPath,JSON.stringify(seatDetailsArray),(error)=>{
        console.log(" file written success in seatDetailsDataPath ");
      })
    }).catch((error) => {
      console.error("Error fetching seat class details:", error);
    });
    
    // TrainAvailableModel.fetchSeatAvailable(){
      
    // }
    

  
    

    
    res.render("showTrainDetails", {
      traindetails: sortedDetails,
      errorMessage: "",
      PageTitle: 'trainSearchResult',
    });
  });

  

 
  
  

};