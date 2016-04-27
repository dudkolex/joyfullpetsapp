angular.module('main').factory('dataFactory', ['$http', '$q', function($http, $q){
	var pets;
	var deferred = $q.defer();
	var defaultParseUrl = 'http://api.beta.adoptapet.com/search/pet_search?key=b964988cf583b18cd221c70b2e6b0eef&v=beta&output=json&species=cat&city_or_zip=90210&geo_range=35&end_number=10';

	var check404image = function(data){
		angular.forEach(data, function(value, index){
			if((value.large_results_photo_url).indexOf('s3.amazonaws.com') == -1){
				data.splice(index,1);
			}
		});

		return data;
	};

	$http.get(defaultParseUrl).then(
		function(response){
			pets = check404image(response.data.pets);

			deferred.resolve(pets);
		},
		function(error){
			console.error('ERROR!', error);
		}
	);

	return {
		getPets : function(){
			return deferred.promise;
		}
	}
}]);