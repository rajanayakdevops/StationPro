const TrainAvailableModel = require("../model/trainAvailable");

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

    
    res.render("showTrainDetails", {
      traindetails: sortedDetails,
      errorMessage: "",
      PageTitle: 'trainSearchResult',
    });
  });
  
  

};