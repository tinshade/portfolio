import { toast } from "react-toastify";

const iconLookup = {
  success: null,
  info: null,
  error: null,
};

export const notify = (text, type = "success", icon = null) => {
  toast(text, {
    type: type,
    icon: () => (icon ? icon : iconLookup[type]),
    closeButton: false,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
  });
};

export const sortDates = (datesArray) => {
  try {
    const res = datesArray.sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    return res;
  } catch (e) {
    return false;
  }
};

export const getInitials = (name) => {
  if (!name || name?.length === 0) {
    return "?";
  }
  name = name.split(" ");
  let initials = "";
  if (name.length > 1) {
    initials = `${name[0].charAt(0)}${name[1].charAt(0)}`;
  } else if (name[0].length > 1) {
    initials = `${name[0].charAt(0)}${name[0].charAt(1)}`;
  } else {
    initials = name[0].charAt(0);
  }
  return initials.toUpperCase();
};

export const formatUTC = (dateInt, addOffset = false) => {
  let date = !dateInt || dateInt.length < 1 ? new Date() : new Date(dateInt);
  if (typeof dateInt === "string") {
    return date;
  } else {
    const offset = addOffset
      ? date.getTimezoneOffset()
      : -date.getTimezoneOffset();
    const offsetDate = new Date();
    offsetDate.setTime(date.getTime() + offset * 60000);
    return offsetDate;
  }
};

export const capitalizeText = (string) => {
  return string.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const bytesToSize = (bytes, seperator = "") => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
};
