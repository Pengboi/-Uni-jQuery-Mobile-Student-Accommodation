// Popup display intializer
$( document ).on( "pageinit", function() {
    $( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }
    });
});

// Popup event handler region
$(document).on("click", "#popupTrigger", function()
{
    $("#frontView").popup("open");
})

// Popup swipe gesture handlers

// Popup navigation works by closing current popup and opening next respectivew popup using the afterclose: function(){} command

// image one navigation
$(document).on("swipeleft","#picOne", function(){
    $("#frontView").popup({
        afterclose: function () {
            $("#insideView").popup("open");
        }
    }, "close");
    $("#frontView").popup("close");
});

// image two navigation
$(document).on("swiperight","#picTwo", function(){
    $("#insideView").popup({
        afterclose: function () {
            $("#frontView").popup("open");
        }
    }, "close");
    $("#insideView").popup("close");
});
$(document).on("swipeleft","#picTwo", function(){
    $("#insideView").popup({
        afterclose: function () {
            $("#gardenView").popup("open");
        }
    }, "close");
    $("#insideView").popup("close");
});

// image three navigation
$(document).on("swiperight","#picThree", function(){
    $("#gardenView").popup({
        afterclose: function () {
            $("#insideView").popup("open");
        }
    }, "close");
    $("#gardenView").popup("close");
});


// Popup button interaction handlers

// Close popup handlers
$(document).on("click", "#closeOne", function()
{
    $('.ui-popup').popup('close');
    $("#frontView").popup({
        afterclose: function () {
            $('.ui-popup').popup('close');
        }
    }, "close");
})
$(document).on("click", "#closeTwo", function()
{
    $('.ui-popup').popup('close');
    $("#insideView").popup({
        afterclose: function () {
            $('.ui-popup').popup('close');
        }
    }, "close");
})
$(document).on("click", "#closeThree", function()
{
    $('.ui-popup').popup('close');
    $("#gardenView").popup({
        afterclose: function () {
            $('.ui-popup').popup('close');
        }
    }, "close");
})

// Close interest confirmation popup
$(document).on("click", "#closeInterest", function()
{
    $('.ui-popup').popup('close');
    $("#interestPopup").popup({
        afterclose: function () {
            $('.ui-popup').popup('close');
        }
    }, "close");
})

// popup button navigation handlers
$(document).on("click", "#goToFront", function()
{
    $("#insideView").popup({
        afterclose: function () {
            $("#frontView").popup("open");
        }
    }, "close");
    $("#insideView").popup("close");
})

// navigate to middle image using click
$(document).on("click", "#goToMiddle", function()
{
    $("#frontView").popup({
        afterclose: function () {
            $("#insideView").popup("open");
        }
    }, "close");
    $("#frontView").popup("close");
})

// navigate to last image using click
$(document).on("click", "#goToEnd", function()
{
    $("#insideView").popup({
        afterclose: function () {
            $("#gardenView").popup("open");
        }
    }, "close");
    $("#insideView").popup("close");
})

// navigate to middle image from last image using click
$(document).on("click", "#goToMiddleFromEnd", function()
{
    $("#gardenView").popup({
        afterclose: function () {
            $("#insideView").popup("open");
        }
    }, "close");
    $("#gardenView").popup("close");
})