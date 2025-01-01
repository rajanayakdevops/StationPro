const API_KEY = '35c2bfc92amshb0fe28a2fd26ea5p1fa69cjsn2e07b69fe6fd';
const { json } = require("body-parser");
const rootDir = require("../utils/rootpath");
const fs = require('fs');
const path = require('path');



const TravellingDetailsDataPath = path.join(rootDir,'Data','TravellingDetailsDataPath');
const TrainDetailsDataPath = path.join(rootDir,'Data','TrainDetailsDataPath');
const fetchSeatDetailsDataPath = path.join(rootDir,'Data','seatDetailsDataPath');

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

          fs.writeFileSync(TravellingDetailsDataPath,JSON.stringify(TravellingDetails));
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
              // not in use 
              
    // static fetchSeatDetailsData(callback) {
    //   // in the callback json object is passed 

    //   fs.readFile(fetchSeatDetailsDataPath,(err,data) =>{

    //     if (err) {
    //       console.log("Error reading file", err);
    //       return callback([]); 
    //     }

    //     if(!data || data.length === 0){
    //       console.log("no data available passing empty array");
    //       return callback([]);
    //     }
    //     try {
    //       // Parsing the data and pass it to the callback
    //       const parsedData = JSON.parse(data);
    //       return callback(parsedData);
    //     } catch (parseError) {
    //       console.log("error parsing data", parseError);
    //       return callback([]); 
    //     }

    //   });


    // }

    static async fetchTrainDetails(from_station, to_station, travel_date) {
      const axios = require('axios');
    
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'irctc1.p.rapidapi.com',
        },
        params: {
          fromStationCode: from_station,
          toStationCode: to_station,
          dateOfJourney: travel_date,
        },
      };
    
      try {
        // Make the API request using await
        const response = await axios.request(options);
    
        // Check if the response data is empty
        if (!response.data || response.data.length === 0) {
          console.log("Data empty, passing empty object");
          return {};
        }
    
        // Return the data if it's valid
        return response.data;
    
      } catch (error) {
        // Log the error and return fallback data in case of failure
        console.log("Error occurred while fetching train details, returning fallback data");
       return {
          "status": true,
          "message": "Success",
          "timestamp": 1734726922715,
          "data": [
            {
              "train_number": "20902",
              "train_name": "Vande Bharat Express",
              "run_days": ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"],
              "train_src": "GNC",
              "train_dstn": "MMCT",
              "from_std": "15:56",
              "from_sta": "15:53",
              "local_train_from_sta": 953,
              "to_sta": "20:25",
              "to_std": "20:25",
              "from_day": 0,
              "to_day": 0,
              "d_day": 0,
              "from": "BRC",
              "to": "MMCT",
              "from_station_name": "VADODARA JN",
              "to_station_name": "MUMBAI CENTRAL",
              "halt_stn": 3,
              "distance": 392,
              "duration": "4:29",
              "special_train": false,
              "train_type": "VBEX",
              "score": 30,
              "score_train_type": 10,
              "score_booking_requency": 0,
              "frequency_perc": 0,
              "from_distance_text": "",
              "to_distance_text": "13 Kms from LTT",
              "has_pantry": false,
              "is_monsoon_timing_applicable": false,
              "duration_rating": 1,
              "score_duration": 10,
              "score_std": 10,
              "score_user_preferred": 0,
              "train_date": "30-12-2024",
              "class_type": ["CC", "EC"]
            },
            {
              "train_number": "22962",
              "train_name": "Vande Bharat Express",
              "run_days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              "train_src": "ADI",
              "train_dstn": "MMCT",
              "from_std": "07:03",
              "from_sta": "07:00",
              "local_train_from_sta": 420,
              "to_sta": "11:35",
              "to_std": "11:35",
              "from_day": 0,
              "to_day": 0,
              "d_day": 0,
              "from": "BRC",
              "to": "MMCT",
              "from_station_name": "VADODARA JN",
              "to_station_name": "MUMBAI CENTRAL",
              "halt_stn": 3,
              "distance": 391,
              "duration": "4:32",
              "special_train": false,
              "train_type": "VBEX",
              "score": 30,
              "score_train_type": 10,
              "score_booking_requency": 0,
              "frequency_perc": 0,
              "from_distance_text": "",
              "to_distance_text": "13 Kms from LTT",
              "has_pantry": false,
              "is_monsoon_timing_applicable": false,
              "duration_rating": 1,
              "score_duration": 10,
              "score_std": 10,
              "score_user_preferred": 0,
              "train_date": "30-12-2024",
              "class_type": ["CC", "EC"]
            },
            {
              "train_number": "12264",
              "train_name": "Hazrat Nizamuddin - Pune AC Duronto Express",
              "run_days": ["Mon", "Thu"],
              "train_src": "NZM",
              "train_dstn": "PUNE",
              "from_std": "17:37",
              "from_sta": "17:27",
              "local_train_from_sta": 1047,
              "to_sta": "21:43",
              "to_std": "21:48",
              "from_day": 0,
              "to_day": 0,
              "d_day": 0,
              "from": "BRC",
              "to": "BSR",
              "from_station_name": "VADODARA JN",
              "to_station_name": "VASAI ROAD",
              "halt_stn": 1,
              "distance": 344,
              "duration": "4:6",
              "special_train": false,
              "train_type": "DRNT",
              "score": 25,
              "score_train_type": 5,
              "score_booking_requency": 0,
              "frequency_perc": 0,
              "from_distance_text": "",
              "to_distance_text": "35 Kms from LTT",
              "has_pantry": false,
              "is_monsoon_timing_applicable": false,
              "duration_rating": 1,
              "score_duration": 10,
              "score_std": 10,
              "score_user_preferred": 0,
              "train_date": "30-12-2024",
              "class_type": ["3A", "2A", "1A"]
            }]
    }
  }}

  static fetchTrainAvailClasses(trainNumber,callback){
      const axios = require('axios');

// Define the options for the API request
const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
  params: {
    trainNo: trainNumber // Replace with your desired train number
  },
  headers: {
    'x-rapidapi-key': API_KEY,  // Replace with your actual API key
    'x-rapidapi-host': 'irctc1.p.rapidapi.com'
  }
};

// Make the API request
axios.request(options)
  .then(response => {

    if(!response.data || response.data.length === 0){
      console.log(" data empty passing empty array ");
      return callback([]);

    } else{
      return callback(response.data);
    }
  })
  .catch(error => {
    // console.error("error occured in getting seat class available"); `
    return callback(
      {
        "status": true,
        "message": "Success",
        "timestamp": 1734725105035,
        "data": {
          "trainType": "INTERCITY",
          "trainNumber": "12936",
          "trainName": "InterCity Express",
          "runDays": {
            "sun": true,
            "mon": true,
            "tue": true,
            "wed": true,
            "thu": true,
            "fri": true,
            "sat": true
          },
          "class": [
            {
              "value": "2S",
              "name": "Second Seating"
            },
            {
              "value": "CC",
              "name": "AC Chair Car"
            }
          ],
          "quota": [
            {
              "value": "GN",
              "name": "QUOTA General"
            },
            {
              "value": "TQ",
              "name": "Tatkal"
            },
            {
              "value": "PT",
              "name": "Premium Tatkal"
            },
            {
              "value": "LD",
              "name": "Ladies"
            },
            {
              "value": "DF",
              "name": "Defence"
            },
            {
              "value": "FT",
              "name": "Foreign Tourist"
            },
            {
              "value": "DP",
              "name": "Duty Pass"
            },
            {
              "value": "HP",
              "name": "Handicapped"
            },
            {
              "value": "PH",
              "name": "Parliament House"
            },
            {
              "value": "SS",
              "name": "Lower Berth"
            },
            {
              "value": "YU",
              "name": "Yuva"
            }
          ],
          "route": [
            {
              "today_sta": 1000,
              "sta": 1000,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1002,
              "station_name": "NAVSARI",
              "station_code": "NVS",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1000,
              "radius": 500,
              "platform_number": 2,
              "on_time_rating": 0,
              "lng": "72.913814",
              "lat": "20.946371",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "25.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1005,
              "sta": 1005,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1005,
              "station_name": "GANDHI SMRITI",
              "station_code": "GNST",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1005,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.921211",
              "lat": "20.921038",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "28.98",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1006,
              "sta": 1006,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1006,
              "station_name": "HANSAPORE",
              "station_code": "HXR",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1006,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.926044",
              "lat": "20.906927",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "30.48",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1009,
              "sta": 1009,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1009,
              "station_name": "VEDCHHA",
              "station_code": "VDH",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1009,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.936215",
              "lat": "20.874451",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "34.38",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1012,
              "sta": 1012,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1012,
              "station_name": "ANCHELI",
              "station_code": "ACL",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1012,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.945228",
              "lat": "20.845417",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "37.78",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1015,
              "sta": 1015,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1015,
              "station_name": "AMALSAD",
              "station_code": "AML",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1015,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.956042",
              "lat": "20.811323",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "40.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1019,
              "sta": 1019,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1021,
              "station_name": "BILIMORA JN",
              "station_code": "BIM",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1019,
              "radius": 500,
              "platform_number": 2,
              "on_time_rating": 2,
              "lng": "72.970934",
              "lat": "20.763779",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "46.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1041,
              "sta": 1041,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1044,
              "station_name": "VALSAD",
              "station_code": "BL",
              "state_name": "Gujarat",
              "state_code": "GJ",
              "sta_min": 1041,
              "radius": 500,
              "platform_number": 3,
              "on_time_rating": 5,
              "lng": "72.9335991",
              "lat": "20.6086295",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "64.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1063,
              "sta": 1063,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1065,
              "station_name": "VAPI",
              "station_code": "VAPI",
              "state_name": "GUJARAT",
              "state_code": "GJ",
              "sta_min": 1063,
              "radius": 500,
              "platform_number": 2,
              "on_time_rating": 1,
              "lng": "72.908707",
              "lat": "20.373918",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "88.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1120,
              "sta": 1120,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1122,
              "station_name": "BOISAR",
              "station_code": "BOR",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1120,
              "radius": 500,
              "platform_number": 3,
              "on_time_rating": 6,
              "lng": "72.761609",
              "lat": "19.7982373",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "159.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1150,
              "sta": 1150,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1150,
              "station_name": "UMROLI",
              "station_code": "UOI",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1150,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.760477",
              "lat": "19.754587",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "187.55",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1127,
              "sta": 1127,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1127,
              "station_name": "PALGHAR",
              "station_code": "PLG",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1127,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.77215",
              "lat": "19.697708",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "164.98",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1131,
              "sta": 1131,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1131,
              "station_name": "KELVA ROAD",
              "station_code": "KLV",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1131,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.790861",
              "lat": "19.624641",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "168.78",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1134,
              "sta": 1134,
              "train_src": "NVS",
              "stop": false,
              "std_min": 1134,
              "station_name": "SAPHALE",
              "station_code": "SAH",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1134,
              "radius": 500,
              "platform_number": 0,
              "on_time_rating": -1,
              "lng": "72.821846",
              "lat": "19.576612",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "171.62",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1165,
              "sta": 1165,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1167,
              "station_name": "VIRAR",
              "station_code": "VR",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1165,
              "radius": 500,
              "platform_number": 5,
              "on_time_rating": 7,
              "lng": "72.812147",
              "lat": "19.454817",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "202.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1189,
              "sta": 1189,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1191,
              "station_name": "BORIVALI",
              "station_code": "BVI",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1189,
              "radius": 500,
              "platform_number": 9,
              "on_time_rating": 0,
              "lng": "72.856822",
              "lat": "19.229149",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "228.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1205,
              "sta": 1205,
              "train_src": "NVS",
              "stop": true,
              "std_min": 1207,
              "station_name": "ANDHERI",
              "station_code": "ADH",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1205,
              "radius": 500,
              "platform_number": 9,
              "on_time_rating": 1,
              "lng": "72.846563",
              "lat": "19.1171389",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "240.88",
              "day": 1,
              "d_day": 1
            },
            {
              "today_sta": 1240,
              "sta": 1240,
              "train_src": "NVS",
              "stop": true,
              "std_min": 0,
              "station_name": "MUMBAI BANDRA TERMINUS",
              "station_code": "BDTS",
              "state_name": "MAHARASHTRA",
              "state_code": "MH",
              "sta_min": 1240,
              "radius": 500,
              "platform_number": 6,
              "on_time_rating": 9,
              "lng": "72.840965",
              "lat": "19.062341",
              "is_smart_station": false,
              "fog_incidence_probability": 0,
              "distance_from_source": "247.88",
              "day": 1,
              "d_day": 1
            }
          ]
        }
      }
      );    
  });
    }

    static fetchSeatAvailable(type,from,to,number,date,callback){
     
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability',
  params: {
    classType: type,                  // Replace with desired class (e.g., SL, 2A, 3A)
    fromStationCode: from,            // Replace with your source station code
    quota: 'GN',                      // Replace with quota (e.g., GN for General)
    toStationCode: to,             // Replace with your destination station code
    trainNo: number,                 // Replace with your train number
    date: date                // Replace with your travel date
  },
  headers: {
    'x-rapidapi-key': API_KEY,  // Replace with your actual API key
    'x-rapidapi-host': 'irctc1.p.rapidapi.com'
  }
};

axios.request(options)
  .then(response => {
    if(!response.data || response.data.length === 0){
      console.log(" data empty passing empty array ");
      return callback([]);

    } else{
      return callback(response.data.data);
    }
  })
  .catch(error => {
    return callback(
      {
        ticket_fare: 2675,
        catering_charge: 0,
        alt_cnf_seat: false,
        total_fare: 2675,
        date: '30-12-2024',
        confirm_probability_percent: '73',
        confirm_probability: 'Med',
        current_status: 'RLWL5/WL5'
      });       
  });

    }

  


}