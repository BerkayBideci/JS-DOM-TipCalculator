window.addEventListener("DOMContentLoaded", (e) => {

    // DOM Variables 

    const billAmount = document.querySelector("#bill");
    const numberOfPeople = document.querySelector("#people");
    const buttons = document.querySelectorAll(".section1-button");
    const customTipPercent = document.querySelector("#custom");
    const alertSpan = document.querySelector("#alert")
    const tipAmount = document.querySelector("#tip");
    const tipTotal = document.querySelector("#tip-total");
    const resetButton = document.querySelector("#reset")

    // Event Listeners

    billAmount.addEventListener("input", updateTotal);
    customTipPercent.addEventListener("input", () => {
        buttons.forEach((button) => {
            button.classList.remove("section1-button-active");
        });
        updateTotal();
    });
    numberOfPeople.addEventListener("input", updateTotal);
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach(button => {
                button.classList.remove("section1-button-active");
            });
            button.classList.add("section1-button-active");
            updateTotal();
        });
    });
    resetButton.addEventListener("click", resetFunc)

    //Functions

    function updateTotal() {
        let bill = parseFloat(billAmount.value);
        let customTip = parseFloat(customTipPercent.value);
        let people = parseInt(numberOfPeople.value) || 1;
        let selectedButton = null;
        let tipPercentage;

        if (bill < 0) {
            bill = 0;
        }

        if (customTip < 0) {
            customTip = 0;
        }

        if (people <= 0) {
            alertSpan.classList.remove("hidden")
            people = 1;
        } else {
            alertSpan.classList.add("hidden")
        }

        buttons.forEach((button) => {
            if (button.classList.contains("section1-button-active")) {
                selectedButton = button;
                tipPercentage = button.value;
            }

            if (selectedButton === customTipPercent) {
                buttons.forEach((button) => {
                    button.classList.remove("section1-button-active");
                });
                tipPercentage = parseFloat(customTip) / 100;
            }

            if (selectedButton === null) {
                tipPercentage = parseFloat(customTip) / 100;
            }
        });

        const tip = bill * tipPercentage;
        const totalWithTip = (bill + tip) / people;
        const tipPerPerson = tip / people;

        tipAmount.textContent = tipPerPerson ? "$" + tipPerPerson.toFixed(2) : "$0.00";
        tipTotal.textContent = totalWithTip ? "$" + totalWithTip.toFixed(2) : "$0.00";

    }


    function resetFunc() {
        document.querySelector("#bill").value = ""
        document.querySelector("#people").value = ""
        document.querySelector("#custom").value = ""
        document.querySelector("#tip").textContent = "$0.00"
        document.querySelector("#tip-total").textContent = "$0.00"
        const resetButtons = document.querySelectorAll(".section1-button")
        const resetAllButtons = resetButtons.forEach((button) => {
            button.classList.remove("section1-button-active");
        });
        const resetAlertSpan = document.querySelector("#alert")
        resetAlertSpan.classList.add("hidden")
    }
});