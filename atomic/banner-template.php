<!DOCTYPE html>
<html>
<head>
	<title>My Portfolio</title>
	<link rel="stylesheet" type="text/css" href="../dist/css/bootstrap.css">
	<link href="https://fonts.googleapis.com/css?family=Lato|Roboto" rel="stylesheet">
</head>
<body>
	
	<?php include "../common/header.php";?>
	
	<!-- Banner Template 1 -->
	<h1>Banner Template 1</h1>
	<!-- <div class="bt">
		<div class="bt-slider">
			<div class="bt-bg"></div>
			<div class="bt-caption">
				<h1 class="title">HEADLINE</h1>
				<p class="desc">Maecenas faucibus mollis interdum. Morbi leo risus</p>
			</div>
		</div>
	</div> -->
	
	<!-- Banner Template 2 -->
	<h1>Banner Template 2</h1>
	<!-- <div class="bt">
		<div class="bt-overlay"></div>
		<div class="bt-slider">
			<div class="bt-bg"></div>
			<div class="bt-caption bt-caption--center">
				<h1 class="title">HEADLINE</h1>
				<p class="desc">Maecenas faucibus mollis interdum. </p>
				<p><a href="#" class="btn btn-link">See More</a></p>
			</div>
		</div>
	</div> -->
	
	<h1>Banner Template 3</h1>
	<div class="bt">
		<div class="bt-overlay"></div>
		<div class="bt-slider">
			<div class="bt-bg bt-bg--parallax" data-bg="../../images/banner1.jpg,../../images/banner2.jpg,../../images/banner3.jpg"></div>
			<div class="bt-caption bt-caption--center">
				<h1 class="title">HEADLINE</h1>
				<p class="desc">Maecenas faucibus mollis interdum. </p>
				<p><a href="#" class="btn btn-link">See More</a></p>
			</div>
		</div>
	</div>

	
	<?php include "../common/footer.php";?>

	<script type="text/javascript" src="../bower_components/jquery/dist/jquery.js"></script>
	<script type="text/javascript" src="../dist/js/bootstrap.js"></script>

</body>
</html>	