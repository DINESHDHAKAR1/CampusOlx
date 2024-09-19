class appError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? "fail":"error";
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor); //This will not appear in the stack trace
    }
}

module.exports = appError;