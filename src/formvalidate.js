function validateForm() 
{
    // if at least 1 checkbox is enabled, the page is changed to confirmation, otherwise - error popup is shown. 
    if($('#newAccountForm input:checked').length > 0) 
    {
        $.mobile.changePage("#confirmation");
        return false; // stops the error loading page
    }
    else
    {
        $("#preferenceCheckbox").popup("open");
        return false;
    }
}