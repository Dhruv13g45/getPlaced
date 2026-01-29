class CustomApiError extends Error{
    
    constructor(message="Something Went Wrong !!", statusCode, errors=[]){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.data = null
        this.errors = errors
    }
    
}

export default CustomApiError