
class RecordNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RecordNotFoundException';
        this.statusCode = 404
    }
}

export default RecordNotFoundException;
