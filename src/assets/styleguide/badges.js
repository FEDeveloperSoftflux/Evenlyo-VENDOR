export const badgeStyles = {
  // --- New theme for order tracking statuses ---
  "new order": "bg-blue-100 text-blue-800 font-medium",
  "in progress": "bg-green-100 text-green-800 font-medium",
  "reject": "bg-red-200 text-red-800 font-medium",
  "paid": "bg-purple-200 text-purple-800 font-medium",
  "on the way": "bg-amber-200 text-amber-800 font-medium",
  "received back": "bg-blue-100 text-blue-800 font-medium",
  "picked up": "bg-blue-800 text-white font-medium",
  "complete": "bg-green-800 text-white font-medium",
  "claim": "bg-orange-300 text-orange-900 font-medium",

  // --- Aliases for backwards compatibility ---
  "rejected": "bg-red-200 text-red-800 font-medium",
  "in-progress": "bg-green-100 text-green-800 font-medium",
  "pickedup": "bg-blue-800 text-white font-medium",
  
  // --- Original statuses to prevent breaking other parts of the app ---
  "new": "bg-blue-100 text-blue-800 font-medium",
  "confirmed": "bg-green-100 text-green-600",
  "edit": "bg-yellow-100 text-yellow-600",
  "addition": "bg-green-100 text-green-600",
  "approval": "bg-blue-100 text-blue-600",
  "rejection": "bg-red-100 text-red-600",
  "live": "bg-green-100 text-green-600",
  "block": "bg-red-100 text-red-600",
  "delivered": "bg-yellow-200 text-yellow-800 font-medium", 
  "active": "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600",
  "inactive": "bg-red-100 text-red-600",
  "pending": "bg-yellow-100 text-yellow-600",
  "overdue": "bg-red-100 text-red-600",
  "left": "bg-red-100 text-red-600",
  "unread": "bg-pink-100 text-pink-600",
  "read": "bg-gray-100 text-gray-600",
};

export const getBadgeStyle = (status) => {
  const normalizedStatus = status?.toLowerCase().replace(/_/g, " ");
  return badgeStyles[normalizedStatus] || badgeStyles.new;
};
