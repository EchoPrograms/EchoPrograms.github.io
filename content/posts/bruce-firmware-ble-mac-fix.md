{
  "title": "Bruce Firmware Open Source Contribution",
  "date": "2026-01-11",
  "category": "Project",
  "tags": ["Open source", "C++", "ESP32", "Bluetooth", "Embedded"],
  "summary": "An open-source contribution to Bruce firmware that corrected BLE MAC randomization and reorganized its Bluetooth spam menu.",
  "slug": "bruce-firmware-ble-mac-fix",
  "imported": false
}
---

## Contribution

I contributed a fix to the [Bruce firmware](https://github.com/BruceDevices/firmware) project in commit [a419ec2](https://github.com/BruceDevices/firmware/commit/a419ec2a7919f085e588cb320546b4220b270e91). Bruce is open-source firmware for ESP32-based devices.

## BLE MAC handling

The contribution changed BLE spam routines to randomize the Bluetooth interface MAC with `esp_iface_mac_addr_set(macAddr, ESP_MAC_BT)`. The previous implementation used the base MAC setter, which did not target the Bluetooth interface directly. The change was applied to the standard spam path, custom spam path, and iBeacon path.

The update also adjusted the initialization and advertising delays used by the spam routine. The commit message records Samsung testing for the BLE spam fix and removes delays that were no longer needed in other parts of the flow.

## Menu organization

I reorganized the Bluetooth menu so the main menu exposes one BLE Spam entry. That entry groups Apple, Windows, Samsung, Android, all-device, and custom options. The previous Apple behavior remains available under an explicitly labeled Apple Spam (Legacy) submenu, with SourApple and AppleJuice options.

The menu and implementation changes were made across `BleMenu.cpp`, `apple_spam.cpp`, `ble_spam.cpp`, and `ble_spam.h`.

## Result

The contribution corrected interface-specific BLE MAC randomization, refined the advertising timing, and made the Bluetooth spam options easier to navigate without removing the legacy Apple options. It was merged into the Bruce firmware repository as pull request #2016.
