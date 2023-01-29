class APIFeatures {
    constructor(query, queryString, totalItem) {
        this.query = query;
        this.queryString = queryString;
        this.totalItem = totalItem;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'per_page', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        this.query = this.query.find();

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const per_page = this.queryString.per_page * 1 || 100;
        const skip = (page - 1) * per_page;

        this.query = this.query.skip(skip).limit(per_page);
        if (this.queryString.page) {
            const totalItems = this.totalItem;
            if (skip > totalItems) throw new Error('This page is not exists')
        }

        return this;
    }
}
module.exports = APIFeatures;
