module.exports = {
    500: () => {
        console.log("Internal Server Error")
        return "Internal Server Error";
    },
    404: (input) => {
        console.log(`${input} Not Found`)
        return `${input} Not Found`;
    },
    401: ()=> {
        console.log("Unauthorized Access")
        return "Unauthorized Access";
    },
    409: (input) => {
        console.log(`${input} already exists`);
        return `${input} already exists`;
    },
    404: (input) => {
        console.log(`${input} not found`);
        return `${input} not found`
    }
}