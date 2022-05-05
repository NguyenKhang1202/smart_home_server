const apiResponse = require('../../utils/apiResponse');
const APIStatus = require('../../constants/APIStatus')
const { getAllDeviceDb, getDeviceDb, createDeviceDb, deleteDeviceDb } = require('../../db/device.db');
// const { getAllRoomDb, getRoomDb, getDeviceInRoom, deleteRoomDb } = require('../../db/room.db');

// GET('/')
const getAllDevices = async (req, res, next) => {
    const _id = req.user._id;

    const devices = await getAllDeviceDb({ userId: _id });

    if(devices) return res.status(200).json(apiResponse({ status: APIStatus.SUCCESS, data: devices }));
    else return res.status(404).json(apiResponse({status: APIStatus.FAIL, msg: 'Device not found'}));
};

// GET('/:id')
const getDevice = async (req, res, next) => {
    const device = await getDeviceDb({ _id: req.params.id });

    // null nếu không tìm thấy
    if(device) {
        return res.status(200).json(apiResponse({ status: APIStatus.SUCCESS, data: device }));
    } else return res.status(404).json(apiResponse({status: APIStatus.FAIL, msg: 'Device not found'}));
};

// POST('/')
const createDevice = async (req, res, next) => {
    const userId = req.user._id,
          { deviceName, status, roomId } = req.body;
    const device = await getDeviceDb({ deviceName, roomId });
    if(device) return res.status(200).json(apiResponse({status: APIStatus.FAIL, msg: 'Bạn đã có thiết bị này' }));

    const rs = await createDeviceDb({ deviceName, status , roomId, userId });

    return res.status(201).json(apiResponse({ status: APIStatus.SUCCESS, data: rs }));
};

// DELETE(/:id)
const deleteDevice = async (req, res, next) => {
    const _id = req.params.id;

    const data = await getDeviceDb({ _id });
    if(!data) return res.status(400).json(apiResponse({ status: APIStatus.FAIL, msg: "You don't have this device" }))
    
    const device = await deleteDeviceDb({ _id });

    if(device) return res.status(200).json(apiResponse({ status: APIStatus.SUCCESS, msg: 'Delete success this device', data: device }));
}

module.exports = {
    getDevice,
    getAllDevices,
    createDevice,
    deleteDevice,
};
