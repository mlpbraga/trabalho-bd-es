import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";

export function onClick(e, item, history) {
  window.alert(JSON.stringify(item, null, 2));
  history.push(item.name);
}

const items = [
  { name: "/home", label: "Home", Icon: HomeIcon },
  {
    name: "/billing",
    label: "Billing",
    Icon: ReceiptIcon,
    items: [
      { name: "/statements", label: "Statements", onClick },
      { name: "/reports", label: "Reports", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance", onClick },
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        items: [
          { name: "email", label: "Email", onClick },
          {
            name: "desktop",
            label: "Desktop",
            Icon: DesktopWindowsIcon,
            items: [
              { name: "schedule", label: "Schedule" },
              { name: "frequency", label: "Frequency" }
            ]
          },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];

export default items;