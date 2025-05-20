
    alert("Welcome");
    confirm("Are You Sure To Watch This Project!");
    nm=prompt("Please! Enter Your Good Name....||");
    alert("Welcome\t"+"  "+nm);
    async function updateBatteryStatus() {
      const battery = await navigator.getBattery();
      const chargeSound = document.getElementById("charge-sound");
      const lowBatterySound = document.getElementById("low-battery-sound");
      let lastChargingState = battery.charging;
      let lowBatteryAlerted = false;

      function updateAllBatteryInfo() {
        const level = Math.round(battery.level * 100);
        const batteryLevel = document.getElementById("battery-level");
        const statusLabel = document.getElementById("charging-status");
        const batteryBar = document.getElementById("battery-bar");
        const card = document.getElementById("battery-card");

        batteryLevel.textContent = `Battery Level: ${level}%`;
        batteryBar.style.width = `${level}%`;
        batteryBar.setAttribute("aria-valuenow", level);

        if (battery.charging) {
          statusLabel.textContent = "Status: Charging ⚡";
          statusLabel.className = "charging-label";
          card.style.boxShadow = "0 0 20px 4px limegreen";
          batteryBar.className = "progress-bar bg-success progress-bar-striped progress-bar-animated";
          if (!lastChargingState) {
            chargeSound.play();
          }
        } else {
          statusLabel.textContent = "Status: Not Charging";
          statusLabel.className = "not-charging-label";
          card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          batteryBar.className = "progress-bar bg-danger";

          // Low battery warning
          if (level <= 20 && !lowBatteryAlerted) {
            lowBatterySound.play();
            lowBatteryAlerted = true;
          } else if (level > 20) {
            lowBatteryAlerted = false;
          }
        }

        lastChargingState = battery.charging;
      }

      updateAllBatteryInfo();

      battery.addEventListener("levelchange", updateAllBatteryInfo);
      battery.addEventListener("chargingchange", updateAllBatteryInfo);
    }

    updateBatteryStatus();
 