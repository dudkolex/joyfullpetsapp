angular.module('main').controller('dataCtrl', ['dataFactory', '$http', '$q', function(dataFactory, $http, $q){

    var promise = dataFactory.getPets();

    promise.then(function(value){
        this.pets = value;

        this.pets = dataFactory.createTable(this.pets, 2);
    }.bind(this));

//    angular.forEach(this.pets, function (value) {
//        value.deg = Math.round(Math.random() * (-5 -5) + 5);
//    });


	this.doRefresh = function() {
		var defaultParseUrl = 'http://api.beta.adoptapet.com/search/pet_search?key=b964988cf583b18cd221c70b2e6b0eef&v=beta&output=json&species=cat&city_or_zip=90210&geo_range=35&end_number=10';
		var deferred = $q.defer();

		var check404image = function(data){
			angular.forEach(data, function(value, index){
				if((value.large_results_photo_url).indexOf('s3.amazonaws.com') == -1){
					data.splice(index,1);
				}
			});

			return data;
		};
//
		$http.get(defaultParseUrl).then(
			function(response){
				pets = check404image(response.data.pets);

				deferred.resolve(pets);
			}
		).finally(function() {
				promise.then(function(value){
					this.pets = value;

					this.pets = dataFactory.createTable(this.pets, 3);
				}.bind(this));
			}.bind(this));
	};
}]);