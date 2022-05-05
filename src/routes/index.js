const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const adminRouter = require('./admin.route');
const roomRouter = require('./room.route');
const deviceRouter = require('./device.route');

//Index of route middleware
const route = (app) => {

    // Route middleware auth
	app.use('/auth', authRouter);

    // Route user
    app.use('/api/v1/users', userRouter);

    // Route admin
    app.use('/api/v1/admins', adminRouter);
    
    // Route room
    app.use('/api/v1/rooms', roomRouter);

    // Route device
    app.use('/api/v1/devices', deviceRouter);
}

module.exports = route;
