exports.handler = async (event) => {
    console.log(event)
    const userId = event.pathParameters.id;
    const userName = event.pathParameters.id + ' name';
    const user = {'userId': userId, 'userName': userName };
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(user),
    };
    return response;
};