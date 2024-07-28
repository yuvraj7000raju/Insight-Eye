// import { ApiError } from "../utils/ApiError.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
// import { asyncHandler } from "../utils/asyncHandler.js"
// import { house } from "../models/house.model.js"

// const registerhouse = asyncHandler(async (req, res) => {
//     const { Name,leak,flowrate,consumption,ward } = req.body
//     console.log(req.body)
   
  
//     const houser = await house.create({
//       Name,
//         leak,
//         flowrate,
//         consumption,
//         ward
  
//     })


//     return res.status(200).json(
//       new ApiResponse(200, "user created successfully")
//     )

//   }
//   )

//   const findinvalid = asyncHandler(async (req, res) => {
//     const { ward, } = req.body
 

// })

//   export {
//     registerhouse,
    
//   }
  

import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { house } from "../models/house.model.js"
import { invalid } from "../models/invalid.model.js" // Import the invalid model

const registerhouse = asyncHandler(async (req, res) => {
  const { Name, leak, flowrate, consumption, ward } = req.body;
  console.log(req.body);

  const houser = await house.create({
    Name,
    leak,
    flowrate,
    consumption,
    ward
  });

  return res.status(200).json(
    new ApiResponse(200, "user created successfully")
  );
});

const findinvalid = asyncHandler(async (req, res) => {
  const { ward } = req.body;

  try {
    const invalidHouses = await invalid.find({ ward });
    return res.status(200).json(invalidHouses);
  } catch (error) {
    return res.status(500).json(new ApiError(500, "An error occurred while fetching invalid houses"));
  }
});

export {
  registerhouse,
  findinvalid // Export the findinvalid controller
};