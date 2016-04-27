angular.module('main').controller('dataCtrl', ['dataFactory','$scope', function(dataFactory, $scope){

	var	promise = dataFactory.getPets();

	promise.then(function(value){
		this.pets = value;
		console.log(this.pets);
	}.bind(this));
}]);