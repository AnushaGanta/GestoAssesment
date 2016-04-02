angular.module('foodController', [])

// inject the Food service factory into our controller
.controller('mainController', ['$scope', '$http', '$location', 'Foods', 'Orders', 'alertify',
	function($scope, $http, $location, Foods, Orders, alertify) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.total = 0;
	$scope.orderData = {};
	$scope.foods = [];

	// GET =====================================================================
	// when landing on the page, get all foods and show them
	// use the service to get all the foods

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
				var newFood = data;
				Foods.total()
					.success(function(data) {
						$scope.total = data;
						$scope.loading = false;
						alertify.success('Added new item');
					});
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.foods.push(newFood); // assign our new list of foods
				console.log($scope.foods);
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
					var _removed = data;
					Foods.total()
						.success(function(data) {
							$scope.total = data;
							$scope.loading = false;
							alertify.error('Successfully removed item');
						});

					for(var i = 0; i < $scope.foods.length; i++) {
						if($scope.foods[i]._id == id) {
							$scope.foods.splice(i, 1);
						}
					}
				});
		});
	};

	$scope.toggle = function(id) {

	};

	$scope.checkout = function() {
		// create order here
		$scope.orderData.foods = [];
		$scope.orderData.total_cost = $scope.total;

		for(var i = 0; i < $scope.foods.length; i++ ) {
			$scope.orderData.foods.push($scope.foods[i]._id);
		}

		console.log($scope.orderData);
		console.log($scope.total);

		Orders.create($scope.orderData)
		// if successful creation, call our get function to get all the new foods
		.success(function(data) {
			$scope.orderData = {}; // clear the form so our user is ready to enter another
			$scope.foods = []; // assign our new list of foods
			alertify.success('Created your order');
			$location.url('orders');
		});
	}

}]);


angular.module('foodController')
.controller('orderController', ['$scope', '$http', function($scope, $http) {

}]);
