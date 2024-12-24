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

    fs.writeFileSync(sortedDetailsDataPath,JSON.stringify(sortedDetails));

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
      // console.log(JSON.stringify(seatDetailsArray)); 
      fs.writeFileSync(seatDetailsDataPath,JSON.stringify(seatDetailsArray));
      fetchSeatDetails(from,to,date);
    }).catch((error) => {
      console.error("Error fetching seat class details:", error);
    });
    
    ////////////////////////

    // not in use 
    // let seatClassArray = [];
    // const finalTrainDetails = path.join(rootDir,'Data','finalTrainDetails');


    
// TrainAvailableModel.fetchSeatDetailsData((seatDetails) => {
//   Promise.all(
//     seatDetails.map(async (train) => {
//       // Create a new object with only the relevant keys
//       return {
//         train_number: train.train_number,
//         class: train.class,
//       };
//     })
//   )
//     .then((resolvedArray) => {
//       seatClassArray = resolvedArray;
      
//       fs.writeFileSync(finalTrainDetails,JSON.stringify(seatClassArray));
      
//     })
//     .catch((error) => {
//       console.error("Error processing seat details:", error);
//     });

    
// });

function fetchSeatDetails(fromStationCode,toStationCode,dateOfJourney){
  fs.readFile(seatDetailsDataPath, 'utf8', (error, data) => {
    if (error) {
        console.log("Error while reading the seatDetails:", error.message);
        return;
    }
  
    try {
        // Parse the JSON data
        const seatDetails = JSON.parse(data);
  
        // Check if the parsed data is an array
        if (Array.isArray(seatDetails)) {
  
          for (const train of seatDetails) {
            const { train_number, class: seatClasses } = train;
    
            // For each class of the train, fetch seat availability
            for (const seatClass of seatClasses) {
              TrainAvailableModel.fetchSeatAvailable(seatClass.value,fromStationCode,toStationCode,train_number,dateOfJourney,(seatAvailable)=>{
                console.log(seatAvailable);
              })
            }
          }
  
  
  
  
            
        } else {
            console.log("Data is not an array");
        }
    } catch (parseError) {
        console.log("Error parsing JSON data:", parseError.message);
    }
  });
  
}
      

          //////////////////////////////////////////
            



          /////////////////////////////


      












  
    
    res.render("showTrainDetails", {
      traindetails: sortedDetails,
      errorMessage: "",
      PageTitle: 'trainSearchResult',
    });
  });

  

 
  
  

};