const URL = 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations';
const API_KEY = '35c2bfc92amshb0fe28a2fd26ea5p1fa69cjsn2e07b69fe6fd';
const { json } = require("body-parser");
const rootDir = require("../utils/rootpath");
const fs = require('fs');
const path = require('path');



const TravellingDetailsDataPath = path.join(rootDir,'Data','TravellingDetailsDataPath');
const TrainDetailsDataPath = path.join(rootDir,'Data','TrainDetailsDataPath');

const TravellingDetails = [];
module.exports =  class TrainAvailable {
    constructor(from_station,to_station,travel_date){
      this.from_station = from_station;
      this.to_station = to_station;
      this.travel_date = travel_date;
    }
    save() {
          this.id = Math.random().toString();
          TravellingDetails.push(this);

          fs.writeFile(TravellingDetailsDataPath,JSON.stringify(TravellingDetails), error =>{
            if(error){
              console.log("error while file writing",error);
            }
            console.log("file writing successfull in the database");
          });
    }

    static fetchTravellingDetails(callback) {
      // in the callback json object is passed 

      fs.readFile(TravellingDetailsDataPath,(err,data) =>{

        if (err) {
          console.log("Error reading file", err);
          return callback([]); 
        }

        if(!data || data.length === 0){
          console.log("no data available passing empty array");
          return callback([]);
        }
        try {
          // Parsing the data and pass it to the callback
          const parsedData = JSON.parse(data);
          return callback(parsedData);
        } catch (parseError) {
          console.log("error parsing data", parseError);
          return callback([]); 
        }

      });


    }

    static fetchTrainDetails(from_station,to_station,travel_date,callback){

     
const fs = require('fs');
const axios = require('axios');

const options = {
  method: 'GET',
  url: URL,
  headers: {
    'x-rapidapi-key': API_KEY, 
    'x-rapidapi-host': 'irctc1.p.rapidapi.com'
  },
  params: {
    fromStationCode: from_station,       
    toStationCode: to_station,         
    dateOfJourney: travel_date    
  }
};

axios.request(options)
  .then(response => {

    // const result = JSON.stringify(response.data);
    // fs.writeFileSync("TrainDetailsDataPath",result);
    // console.log(response.data); 
    
    if(!response.data || response.data.length === 0){
      console.log(" data empty passing empty array ");
      return callback([]);

    } else{
      return callback(response.data.data);
    }
  })
  .catch(error => {
    console.error("error occured passing empty array ",error);
    return callback(); // Handle any errors
  });


    }


}