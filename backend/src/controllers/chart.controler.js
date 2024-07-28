import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { side } from "../models/side.model.js"
import { water } from "../models/water.model.js"

let chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
  

  const chartData1 = [
    { ward: "Ward 1", waterConsumption: 1250 },
    { ward: "Ward 2", waterConsumption: 1340 },
    { ward: "Ward 3", waterConsumption: 1450 },
    { ward: "Ward 4", waterConsumption: 1100 },
    { ward: "Ward 5", waterConsumption: 1380 },
    { ward: "Ward 6", waterConsumption: 1270 },
    { ward: "Ward 7", waterConsumption: 1180 },
    { ward: "Ward 8", waterConsumption: 1300 },
    { ward: "Ward 9", waterConsumption: 1220 },
    { ward: "Ward 10", waterConsumption: 1400 },
    { ward: "Ward 11", waterConsumption: 1350 },
    { ward: "Ward 12", waterConsumption: 1200 },
    { ward: "Ward 13", waterConsumption: 1450 },
    { ward: "Ward 14", waterConsumption: 1500 },
    { ward: "Ward 15", waterConsumption: 1350 },
    { ward: "Ward 16", waterConsumption: 1400 },
    { ward: "Ward 17", waterConsumption: 1280 },
    { ward: "Ward 18", waterConsumption: 1320 },
    { ward: "Ward 19", waterConsumption: 1260 },
    { ward: "Ward 20", waterConsumption: 1370 },
    { ward: "Ward 21", waterConsumption: 1330 },
    { ward: "Ward 22", waterConsumption: 1290 },
    { ward: "Ward 23", waterConsumption: 1410 },
    { ward: "Ward 24", waterConsumption: 1460 },
    { ward: "Ward 25", waterConsumption: 1420 },
    { ward: "Ward 26", waterConsumption: 1380 },
    { ward: "Ward 27", waterConsumption: 1440 },
    { ward: "Ward 28", waterConsumption: 1300 },
    { ward: "Ward 29", waterConsumption: 1270 },
    { ward: "Ward 30", waterConsumption: 1430 },
  ];

const registerside = asyncHandler(async (req, res) => {
  const { date, } = req.body;
  console.log(req.body);

  const houser = await side.create({
   date,
   data : JSON.stringify(chartData)
  });

  return res.status(200).json(
    new ApiResponse(200, "user created successfully")
  );
});

const findside = asyncHandler(async (req, res) => {
  const { date} = req.body;

  try {
    const sidec = await side.find({ date });
    return res.status(200).json(sidec);
  } catch (error) {
    return res.status(500).json(new ApiError(500, "An error occurred while fetching invalid houses"));
  }
});




const registerwater = asyncHandler(async (req, res) => {
  const { date, } = req.body;
  console.log(req.body);

  const houser = await side.create({
   date,
   data : JSON.stringify(chartData1)
  });

  return res.status(200).json(
    new ApiResponse(200, "user created successfully")
  );
});

const findwater = asyncHandler(async (req, res) => {
  const { date} = req.body;

  try {
    const sidec = await water.find({ date });
    return res.status(200).json(sidec);
  } catch (error) {
    return res.status(500).json(new ApiError(500, "An error occurred while fetching invalid houses"));
  }
});

export {
  registerside,
  findside,
  findwater,
  registerwater
   // Export the findinvalid controller
};