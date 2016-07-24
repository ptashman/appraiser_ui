jQuery(document).ready(function($) {
  $("body").on("submit", "#ninja_forms_form_5", function(event) {
    event.preventDefault();
    var subscribed = "true";
    $.post(defineURL('ajaxurl'), {action: 'subscribed'}, function(result) { 
      if (result) {
        subscribed = result.split(/[()]+/).filter(function(e) { return e; })[1];
        console.log(subscribed);
        if (subscribed == "false") {
          $("#nf_submit_5").css("display", "block");
          $("#nf_processing_5").css("display", "none");
          alert("Please login or subscribe to submit this form.");
        } else {
          $.ajax({
            url: 'http://murmuring-bayou-79194.herokuapp.com/evaluate_property',
            type: "POST",
            data: {
              zip: $("input[name=ninja_forms_field_5]").val(),
              price: $("input[name=ninja_forms_field_11]").val().substring(1).slice(0,-3).replace(/\,+/g, ''),
              beds: $("input[name=ninja_forms_field_13]").val(),
              bathrooms: $("input[name=ninja_forms_field_14]").val()
            },
            success: function(response) {
              if(response) {
                $("#cap_rate_grade").find(".grade").text("");
                $("#room_demand_grade").find(".grade").text("");
                $("#credit_score_grade").find(".grade").text("");
                var document_height = $(document).height();
                $("html, body").animate({
                  scrollTop: document_height
                }, "slow");
                $("#nf_submit_5").css("display", "block");
                $("#nf_processing_5").css("display", "none");
                $(".hundred").removeClass("hide");
                $("#ninja_forms_field_6").val("Submit");
                $("#cap_rate_grade").find(".grade").text(response['cap_ratio_grade'].toString());
                $("#room_demand_grade").find(".grade").text(response['room_demand_grade'].toString());
                $("#credit_score_grade").find(".grade").text(response['credit_score_grade'].toString());
              }
            }
          });
        }
      }
    });
  });
});
