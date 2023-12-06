$(document).ready(function () {
  $("#calculate-form").submit(function (event) {
    event.preventDefault();

    const dayInput = $("#day");
    const monthInput = $("#month");
    const yearInput = $("#year");

    const day = parseInt(dayInput.val());
    const month = parseInt(monthInput.val());
    const year = parseInt(yearInput.val());

    const isValidDay = validateDay(day, month, year);
    const isValidMonth = validateMonth(month);
    const isValidYear = validateYear(year);

    const currentDate = new Date();
    const birthDate = new Date(year, month, day);

    if (isValidDay && isValidMonth && isValidYear) {
      console.log("Date is valid");
      handleValidDate();
      const age = calculateAge(currentDate, birthDate);

      displayAge(age);
    } else {
      console.log("Invalid date");
      if (!isValidDay) {
        dayInput.addClass("invalid-input");
        $("#day-label").addClass("invalid-label");
      } else {
        dayInput.removeClass("invalid-input");
      }

      if (!isValidMonth) {
        monthInput.addClass("invalid-input");
        $("#month-label").addClass("invalid-label");
        $("#month-label").next().css("display", "block");
      } else {
        monthInput.removeClass("invalid-input");
      }

      if (!isValidYear) {
        yearInput.addClass("invalid-input");
        $("#year-label").addClass("invalid-label");
      } else {
        yearInput.removeClass("invalid-input");
      }
    }
  });

  $(".calc-input").on("input", function () {
    $(this).removeClass("invalid-input");
    $("#month-label").removeClass("invalid-label");
    $("#year-label").removeClass("invalid-label");
    $("#day-label").removeClass("invalid-label");
  });

  function validateDay(day, month, year) {
    if (
      year < 1900 ||
      year > 2023 ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31
    ) {
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    if (day > daysInMonth) {
      return false;
    }

    return true;
  }

  function validateMonth(month) {
    return !(month < 1 || month > 12);
  }

  function validateYear(year) {
    return !(year < 1900 || year > 2023);
  }

  function handleValidDate() {
    $("#calculate-form").off("submit").submit();
  }
  function calculateAge(currentDate, birthDate) {
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    };
  }

  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function displayAge(age) {
    $("#years-output").text(age.years);
    $("#months-output").text(age.months);
    $("#days-output").text(age.days);
  }
});
