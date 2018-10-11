var env = process.env.NODE_ENV || 'development';

console.log('************************************************************');
console.log(`SECCESSFULLY LOGGED TO DATABASE @"${env}" ENVIROMENT`);
console.log('************************************************************');


if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI ='mongodb://localhost:27017/trading';
} else if (env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/tradingTest';
}
