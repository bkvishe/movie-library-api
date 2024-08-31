
class DuplicateRecordException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateRecordException';
        this.statusCode = 400
    }
}

export default DuplicateRecordException;
