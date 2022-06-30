const { date } = require("joi");
const apiResponse = require("../../utils/apiResponse");
const APIStatus = require("../../constants/APIStatus");
const MeterPower = require("../models/meter_power.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createMeterPower = async (req, res, next) => {
  const meter_power = await new MeterPower(req.body).save();
  if (meter_power) {
    return res
      .status(200)
      .json(apiResponse({ status: APIStatus.SUCCESS, data: meter_power }));
  } else {
    return res.status(500).json(
      apiResponse({
        status: APIStatus.FAIL,
        message: "Thêm mới không thành công",
      })
    );
  }
};

// const getMeterPowerByDay = async (req, res) => {
//   const userId = req.user._id;
//   console.log(userId);

//   try {
//     var pipeline = [
//       {
//         $match: {
//           userId: new ObjectId(userId),
//         },
//       },
//       {
//         $addFields: {
//           day: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$dateTime",
//             },
//           },
//           month: {
//             $dateToString: {
//               format: "%Y-%m",
//               date: "$dateTime",
//             },
//           },
//         },
//       },
//       // nhóm các doc có cùng : date
//       {
//         $group: {
//           _id: "$day",
//           totalActivePower: {
//             $sum: "$activePower",
//           },
//         },
//       },
//       {
//         $project: {
//           date: {
//             $dateFromString: {
//               dateString: "$_id",
//             },
//           },
//           totalActivePower: {
//             $round: ["$totalActivePower", 3],
//           },
//           _id: 0,
//         },
//       },
//     ];

//     MeterPower.aggregate(pipeline).exec((err, listMeter) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log("listMeter", listMeter);

//       return res.status(200).json({
//         success: true,
//         message: "get meter power succes",
//         data: listMeter,
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//       error: err.message,
//     });
//     return;
//   }
// };

// Lấy về điên năng các tháng trong năm
const getAllMonInYear = async (req, res) => {
  const userId = req.user._id;
  const dateBody = req.body;
  console.log("dateBody", dateBody); // "year": "2022"
  try {
    var pipeline = [
      {
        $addFields: {
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$dateTime",
            },
          },
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$dateTime",
            },
          },
          year: {
            $dateToString: {
              format: "%Y",
              date: "$dateTime",
            },
          },
        },
      },
      {
        $match: {
          userId: new ObjectId(userId),
          ...dateBody,
        },
      },
      {
        $group: {
          _id: "$month",
          totalActivePower: {
            $sum: "$activePower",
          },
        },
      },
    ];

    MeterPower.aggregate(pipeline).exec((err, listMeter) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json(
        apiResponse({
          status: APIStatus.SUCCESS,
          data: listMeter,
          message: "Get meter_power day in month successfully",
        })
      );
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      apiResponse({
        status: APIStatus.FAIL,
        message: err.message,
      })
    );
  }
};

// Lấy về lượng điện năng tiêu thụ theo ngày (ngày, tháng, or năm)
// đặt params là filter, query là dateTime
const getAllStatistics = async (req, res) => {
  const userId = req.user._id;
  const filter = req.params.filter;
  const dateTime = req.params.dateTime;
  let data = JSON.parse(`{"${filter}": "${dateTime}"}`);
  try {
    var pipeline = [
      {
        $addFields: {
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$dateTime",
            },
          },
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$dateTime",
            },
          },
          year: {
            $dateToString: {
              format: "%Y",
              date: "$dateTime",
            },
          },
        },
      },
      {
        $match: {
          userId: new ObjectId(userId),
          ...data,
        },
      },
    ];

    MeterPower.aggregate(pipeline).exec((err, listMeter) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json(
        apiResponse({
          status: APIStatus.SUCCESS,
          data: listMeter,
          message: "Get meter_power day in month successfully",
        })
      );
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      apiResponse({
        status: APIStatus.FAIL,
        message: err.message,
      })
    );
  }
};

// Tăng điện năng tiêu thụ
// const editMeterPower = async (req, res) => {
//   const userId = req.user._id;
//   const filter = req.params.dateTime;
//   const activePower = req.body.activePower;
//   try {
//     var pipeline = [
//       {
//         $addFields: {
//           day: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$dateTime",
//             },
//           },
//         },
//       },
//       {
//         $match: {
//           userId: new ObjectId(userId),
//           day: filter,
//         },
//       },
//     ];

//     MeterPower.aggregate(pipeline).exec((err, listMeter) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(listMeter);

//       listMeter[0].activePower = activePower;
//       // const rs = listMeter[0].save();
//       if (rs) {
//         return res.status(200).json(
//           apiResponse({
//             status: APIStatus.SUCCESS,
//             data: listMeter,
//             message: "Get meter_power day in month successfully",
//           })
//         );
//       }
//       return res.status(500).json(
//         apiResponse({
//           status: APIStatus.FAIL,
//           message: "Fail get meter power",
//         })
//       );
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json(
//       apiResponse({
//         status: APIStatus.FAIL,
//         message: err.message,
//       })
//     );
//   }
// };

module.exports = {
  createMeterPower,
  getMeterPowerByDay,
  getAllMonInYear,
  getAllStatistics,
  // editMeterPower,
};
