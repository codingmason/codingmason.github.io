  document.getElementsByTagName('form')[0].onsubmit = function(event) {
            var newDrinkVal = document.getElementsByClassName('input')[0].value
            event.preventDefault();
            if (newDrinkVal !== '') {
                var newInput = document.createElement('input');
                newInput.type = 'text';
                var newDrinkDiv = document.createElement('div');
                var newCloseButton = document.createElement('span');
                newInput.className = 'drink-name';
                newInput.value = newDrinkVal;
                newDrinkDiv.className = 'drink';
                newCloseButton.className = 'close-button';
                newCloseButton.innerHTML = 'X';
                newDrinkDiv.appendChild(newInput);
                newDrinkDiv.appendChild(newCloseButton);
                document.getElementsByClassName('active')[0].appendChild(newDrinkDiv);
                var inputElement = document.getElementsByClassName('input')[0];
                inputElement.value = ''
                wheel.update();
                return false; 
            }
        };

        var closeButtons = document.getElementsByClassName("close-button");
        var deleteDiv = function() {
            this.parentElement.remove();
            wheel.update();
            return false;
        };
        for (var i = 0; i < closeButtons.length; i++) {
            closeButtons[i].addEventListener('click', deleteDiv, false);
        }

        var updateWheel = function() { 
          wheel.update();

      
        }

        var drinkNames = document.getElementsByClassName("drink-name");
        for (var i = 0; i < drinkNames.length; i++) {
            drinkNames[i].addEventListener('change', updateWheel, false);
        }

        var tabs = document.getElementsByClassName("tablinks");
        var clickTab = function() {
           for (var i = 0; i < tabs.length; i++) {
            tabs[i].parentElement.className = "";
          }
          this.parentElement.className = "clicked";

        };
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', clickTab, false);
        }

        document.getElementById("defaultOpen").click();

     ; 


  