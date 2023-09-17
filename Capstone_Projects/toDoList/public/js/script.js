$(document).ready(function () {
  const checkBoxes = $(".completion-box");
  const elements = $(".completion-task");

  checkBoxes.on("change", function () {
    const isChecked = $(this).prop("checked");
    const correspondingElement = elements.eq(checkBoxes.index(this));

    if (isChecked) {
      correspondingElement.addClass("completed");
    } else {
      correspondingElement.removeClass("completed");
    }
  });
});
