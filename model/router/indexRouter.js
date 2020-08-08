
module.exports = function(start) {
    start.get('/', function(request, response) {
        let queryString = request.query;
        response.render('index', {pageNavigate: queryString});
    });
}