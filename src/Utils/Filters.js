class Filters {

    constructor(reqQuery, mongoQuery) {
        // initialization 
        this.reqQuery = reqQuery;
        this.mongoQuery = mongoQuery
    }

    filter(){
        const myQuery =  { ...this.reqQuery };

        // excluding common fields
        const excludeFields = ['sort', 'page', 'pageSize', 'fields']
        excludeFields.forEach(field => delete myQuery[field])

        //replacing the operators 
        let queryStr = JSON.stringify(myQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (matchedValue) => "$"+matchedValue)        

        this.mongoQuery = this.mongoQuery.find(JSON.parse(queryStr))

        return this;
    }

    sort() {
        if(this.reqQuery.sort) {
            // joining sorted fields with spaces
            const sort = this.reqQuery.sort.split(",").join(" ")
            this.mongoQuery = this.mongoQuery.sort(sort);
        }
        return this
    }

    selectFields() {
        if(this.reqQuery.fields) {
            // joining fields with spaces
            const fields = this.reqQuery.fields.split(",").join(" ")
            this.mongoQuery = this.mongoQuery.select(fields);
        }
        return this
    }

       paginate() {

           const pageSize = this.reqQuery.pageSize * 1 || 20;
           const page = this.reqQuery.page * 1 || 1;
           const skipResults = pageSize * (page - 1);

           this.mongoQuery = this.mongoQuery.skip(skipResults).limit(pageSize);
           return this
       }
}

module.exports = Filters;
