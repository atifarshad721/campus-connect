import emailjs from "@emailjs/browser";

export const formatDateForDisplay = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // e.g., "May 20, 2025"
};

export const formatTimeWithAMPM = (timeStr) => {
  const [hour, minute] = timeStr.split(":");
  const date = new Date();
  date.setHours(parseInt(hour));
  date.setMinutes(parseInt(minute));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // e.g., "06:30 PM"
};

export function formatDateForInput(dateString) {
  const parsedDate = new Date(dateString);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function trimTime(timeString) {
  return timeString.split(" ")[0]; // "06:30 PM" -> "06:30"
}

export function getPreviousDay(dateStr) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "campus_connect_uploads");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwort03lt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

export const sendEmailReminder = (
  name,
  email,
  title,
  date,
  startTime,
  endTime,
  location,
  organizer
) => {
  const templateParams = {
    name: name,
    email: email,
    title: title,
    date: date,
    startTime: startTime,
    endTime: endTime,
    location: location,
    organizer: organizer,
  };

  return emailjs.send(
    "service_0i6qspf",
    "template_4wwpz6b",
    templateParams,
    "7VkHdJWxviYicu7XW"
  );
};
