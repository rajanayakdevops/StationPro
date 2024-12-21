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
      return callback(response.data);
    }
  })
  .catch(error => {
    console.error("error occured passing empty array ",error);
    return callback({
      status: true,
      message: 'Success',
      timestamp: 1727179907929,
      data: [
        {
          train_number: '12951',
          train_name: 'Rajdhani Express',
          run_days: [Array],
          train_src: 'MMCT',
          train_dstn: 'NDLS',
          from_std: '17:24',
          from_sta: '17:22',
          local_train_from_sta: 1042,
          to_sta: '08:32',
          to_std: '08:32',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NDLS',
          from_station_name: 'BORIVALI',
          halt_stn: 5,
          distance: 1354,
          to_station_name: 'NEW DELHI',
          duration: '15:8',
          special_train: false,
          train_type: 'RAJ',
          score: 25,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 1,
          score_duration: 10,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },{
          train_number: '12953',
          train_name: 'August Kranti Rajdhani Express',
          run_days: [Array],
          train_src: 'MMCT',
          train_dstn: 'NZM',
          from_std: '17:35',
          from_sta: '17:33',
          local_train_from_sta: 1053,
          to_sta: '09:43',
          to_std: '09:43',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NZM',
          from_station_name: 'BORIVALI',
          halt_stn: 9,
          distance: 1347,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '16:8',
          special_train: false,
          train_type: 'RAJ',
          score: 25,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 1,
          score_duration: 10,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '22209',
          train_name: 'Duronto Express',
          run_days: [Array],
          train_src: 'MMCT',
          train_dstn: 'NDLS',
          from_std: '23:10',
          from_sta: '23:10',
          local_train_from_sta: 1390,
          to_sta: '15:55',
          to_std: '15:55',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'MMCT',
          to: 'NDLS',
          from_station_name: 'MUMBAI CENTRAL',
          halt_stn: 3,
          distance: 1384,
          to_station_name: 'NEW DELHI',
          duration: '16:45',
          special_train: false,
          train_type: 'MAIL EXPRESS',
          score: 23,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '29 Kms from BVI',
          to_distance_text: '',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 1,
          score_duration: 8,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '22413',
          train_name: 'Rajdhani Express',
          run_days: [Array],
          train_src: 'MAO',
          train_dstn: 'NZM',
          from_std: '19:40',
          from_sta: '19:35',
          local_train_from_sta: 1175,
          to_sta: '12:30',
          to_std: '12:30',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BSR',
          to: 'NZM',
          from_station_name: 'VASAI ROAD',
          halt_stn: 4,
          distance: 1330,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '16:50',
          special_train: false,
          train_type: 'RAJ',
          score: 23,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '17 Kms from BVI',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: true,
          duration_rating: 1,
          score_duration: 8,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '22221',
          train_name: 'Rajdhani Express',
          run_days: [Array],
          train_src: 'CSMT',
          train_dstn: 'NZM',
          from_std: '16:45',
          from_sta: '16:43',
          local_train_from_sta: 1003,
          to_sta: '09:55',
          to_std: '09:55',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'KYN',
          to: 'NZM',
          from_station_name: 'KALYAN JN',
          halt_stn: 6,
          distance: 1489,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '17:10',
          special_train: false,
          train_type: 'RAJ',
          score: 21,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '28 Kms from BVI',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 1,
          score_duration: 6,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12471',
          train_name: 'Swaraj Express',
          run_days: [Array],
          train_src: 'BDTS',
          train_dstn: 'SVDK',
          from_std: '11:26',
          from_sta: '11:23',
          local_train_from_sta: 683,
          to_sta: '05:25',
          to_std: '05:40',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NDLS',
          from_station_name: 'BORIVALI',
          halt_stn: 18,
          distance: 1354,
          to_station_name: 'NEW DELHI',
          duration: '17:59',
          special_train: false,
          train_type: 'SUF',
          score: 21,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 2,
          score_duration: 6,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12903',
          train_name: 'Golden Temple Mail',
          run_days: [Array],
          train_src: 'MMCT',
          train_dstn: 'ASR',
          from_std: '19:18',
          from_sta: '19:15',
          local_train_from_sta: 1155,
          to_sta: '13:50',
          to_std: '14:05',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NZM',
          from_station_name: 'BORIVALI',
          halt_stn: 19,
          distance: 1347,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '18:32',
          special_train: false,
          train_type: 'MAIL EXPRESS',
          score: 21,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 2,
          score_duration: 6,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '22451',
          train_name: 'Mumbai Bandra T - Chandigarh SF Express',
          run_days: [Array],
          train_src: 'BDTS',
          train_dstn: 'CDG',
          from_std: '12:24',
          from_sta: '12:21',
          local_train_from_sta: 741,
          to_sta: '10:18',
          to_std: '10:20',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'DEC',
          from_station_name: 'BORIVALI',
          halt_stn: 21,
          distance: 1316,
          to_station_name: 'DELHI CANTT',
          duration: '21:54',
          special_train: false,
          train_type: 'MAIL EXPRESS',
          score: 21,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '10 Kms from NDLS',
          has_pantry: false,
          is_monsoon_timing_applicable: false,
          duration_rating: 3,
          score_duration: 6,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12925',
          train_name: 'Paschim SF Express',
          run_days: [Array],
          train_src: 'MMCT',
          train_dstn: 'ASR',
          from_std: '11:58',
          from_sta: '11:55',
          local_train_from_sta: 715,
          to_sta: '10:40',
          to_std: '11:05',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NDLS',
          from_station_name: 'BORIVALI',
          halt_stn: 24,
          distance: 1354,
          to_station_name: 'NEW DELHI',
          duration: '22:42',
          special_train: false,
          train_type: 'SUF',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 4,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12171',
          train_name: 'Mumbai LTT - Haridwar AC SF Express',
          run_days: [Array],
          train_src: 'LTT',
          train_dstn: 'HW',
          from_std: '07:55',
          from_sta: '07:55',
          local_train_from_sta: 475,
          to_sta: '06:40',
          to_std: '06:55',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'LTT',
          to: 'NZM',
          from_station_name: 'LOKMANYA TILAK TERM',
          halt_stn: 7,
          distance: 1528,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '22:45',
          special_train: false,
          train_type: 'SUF',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '18 Kms from BVI',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: false,
          duration_rating: 4,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12617',
          train_name: 'Mangala Lakshadweep SF Express',
          run_days: [Array],
          train_src: 'ERS',
          train_dstn: 'NZM',
          from_std: '13:30',
          from_sta: '13:27',
          local_train_from_sta: 2247,
          to_sta: '13:35',
          to_std: '13:35',
          from_day: 1,
          to_day: 2,
          d_day: 1,
          from: 'KYN',
          to: 'NZM',
          from_station_name: 'KALYAN JN',
          halt_stn: 14,
          distance: 1490,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '24:5',
          special_train: false,
          train_type: 'SUF',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '28 Kms from BVI',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: true,
          is_monsoon_timing_applicable: true,
          duration_rating: 4,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '12137',
          train_name: 'Punjab Mail SF Express',
          run_days: [Array],
          train_src: 'CSMT',
          train_dstn: 'FZR',
          from_std: '19:50',
          from_sta: '19:47',
          local_train_from_sta: 1187,
          to_sta: '21:25',
          to_std: '21:40',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'DR',
          to: 'NDLS',
          from_station_name: 'MUMBAI DADAR CENTRAL',
          halt_stn: 33,
          distance: 1542,
          to_station_name: 'NEW DELHI',
          duration: '25:35',
          special_train: false,
          train_type: 'SUF',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '23 Kms from BVI',
          to_distance_text: '',
          has_pantry: false,
          is_monsoon_timing_applicable: false,
          duration_rating: 5,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '19019',
          train_name: 'Mumbai Bandra T - Haridwar Express',
          run_days: [Array],
          train_src: 'BDTS',
          train_dstn: 'HW',
          from_std: '00:48',
          from_sta: '00:45',
          local_train_from_sta: 45,
          to_sta: '02:35',
          to_std: '02:50',
          from_day: 0,
          to_day: 1,
          d_day: 0,
          from: 'BVI',
          to: 'NZM',
          from_station_name: 'BORIVALI',
          halt_stn: 64,
          distance: 1347,
          to_station_name: 'DELHI HAZRAT NIZAMUDDIN',
          duration: '25:47',
          special_train: false,
          train_type: 'MEX',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '',
          to_distance_text: '6 Kms from NDLS',
          has_pantry: false,
          is_monsoon_timing_applicable: false,
          duration_rating: 5,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        },
        {
          train_number: '11057',
          train_name: 'Mumbai CSMT - Amritsar Express',
          run_days: [Array],
          train_src: 'CSMT',
          train_dstn: 'ASR',
          from_std: '00:05',
          from_sta: '00:02',
          local_train_from_sta: 1442,
          to_sta: '03:40',
          to_std: '03:55',
          from_day: 1,
          to_day: 2,
          d_day: 1,
          from: 'TNA',
          to: 'NDLS',
          from_station_name: 'THANE',
          halt_stn: 49,
          distance: 1517,
          to_station_name: 'NEW DELHI',
          duration: '27:35',
          special_train: false,
          train_type: 'MEX',
          score: 19,
          score_train_type: 5,
          score_booking_requency: 0,
          frequency_perc: 0,
          from_distance_text: '13 Kms from BVI',
          to_distance_text: '',
          has_pantry: false,
          is_monsoon_timing_applicable: false,
          duration_rating: 5,
          score_duration: 4,
          score_std: 10,
          score_user_preferred: 0,
          train_date: '28-10-2024',
          class_type: [Array]
        }
      ]
    }); // Handle any errors
  });


    }


}