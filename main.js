$(document).ready(function() {

    // Sends get request to the Vimeo API
    $.ajax({
        url: "https://api.vimeo.com/channels/staffpicks/videos",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer 6097be86da29947fd7fed16e120fcc70');},
        // If the request is successful
        success: function(output) {
            json = output
            // Populates current video div on page load
            $("#current").html(output.data[0].embed.html + "<h2><a href='" + output.data[0].link + "'>" + output.data[0].name + "</h2></a><h3>from<a href='" + output.data[0].user.link + "'> " + output.data[0].user.name +"</a></h3><p>" + output.data[0].description + "</p>");

            // Populates sidebar with video thumbnails
        	for (i = 0; i < output.data.length; i++) {
	   			$("#videos").append("<div id='" + i + "' class='individual_pick'><h4>" + output.data[i].name + "</h4><img src='" + output.data[i].pictures.sizes[1].link + "'></div>")
   			}
            // Highlights first video thumbnail on page load
            $("#0").addClass("current");

            // When thumbnails are selected
            $(".individual_pick").on("click", function() {
                // Scrolls to top of page (for mobile version)
                $(document).scrollTop(0);
                // Highlights selected thumbnail
                $(".individual_pick").removeClass("current");
                $(this).addClass("current");
                // Populates current video div with selected video
                j = $(this).attr('id');
                $("#current").html(output.data[j].embed.html + "<h2><a href='" + output.data[j].link + "'>" + output.data[j].name + "</h2></a><h3>from<a href='" + output.data[j].user.link + "'> " + output.data[j].user.name +"</a></h3><p>" + output.data[j].description + "</p>");
            });
        },
        // If the request is not successful
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
});
