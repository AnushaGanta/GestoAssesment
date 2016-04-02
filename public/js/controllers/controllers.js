angular.module('foodController', [])

// inject the Food service factory into our controller
.controller('mainController', ['$scope', '$http', 'Foods', 'alertify', function($scope, $http, Foods, alertify) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.total = 0;

	// GET =====================================================================
	// when landing on the page, get all foods and show them
	// use the service to get all the foods
	Foods.get()
		.success(function(data) {
			$scope.foods = data;
			$scope.loading = false;
		});

	Foods.total()
		.success(function(data) {
			console.log("Total = " + data);
			$scope.total = data;
			$scope.loading = false;
		});


	// CREATE ==================================================================
	// when submitting the add form, send the text to the node API
	$scope.createFood = function() {

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.name != undefined) {
			if ($scope.formData.price == undefined)
				$scope.formData.price = 1;

			$scope.loading = true;

			// call the create function from our service (returns a promise object)
			Foods.create($scope.formData)
			// if successful creation, call our get function to get all the new foods
			.success(function(data) {
				Foods.total()
					.success(function(data) {
						$scope.total = data;
						$scope.loading = false;
						alertify.success('Added new item');
					});
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.foods = data; // assign our new list of foods
			});

		}
	};

	// DELETE ==================================================================
	// delete a food after checking it
	$scope.deleteFood = function(id) {
		$scope.loading = true;

		alertify.confirm('Delete item?', function () {
			Foods.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					Foods.total()
						.success(function(data) {
							$scope.total = data;
							$scope.loading = false;
							alertify.error('Successfully removed item');
						});

					$scope.foods = data; // assign our new list of foods
				});
		});
	};

	$scope.toggle = function(id) {

	};

}]);


angular.module('foodController')
.controller('orderController', ['$scope', '$http', function($scope, $http) {

}]);
