import React, { useState, useEffect, useRef } from "react";
import { Download, Eye, Mail, ChevronDown } from "lucide-react";
import TrackingPopover from "./TrackingPopover";
import Badge from "../ui/Badge";
import StatusBadge from "./StatusBadge";
import PickedUpModal from "./PickedUpModal";
import StatusChangeConfirmationModal from "../modals/StatusChangeConfirmationModal";

const TrackingTableRow = ({
  order,
  index,
  onOrderClick,
  onMouseEnter,
  onMouseLeave,
  popoverInfo,
  onStatusChange,
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);
  const [showPickedUpModal, setShowPickedUpModal] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    "on the way",
    "received back",
    "pickedup",
    "complete",
    "rejected",
    "claim",
  ];

  const statusIconColors = {
    "on the way": "#92400e", // text-amber-800
    "received back": "#1e40af", // text-blue-800
    pickedup: "#ffffff", // text-white
    complete: "#ffffff", // text-white
    rejected: "#991b1b", // text-red-800
    claim: "#7c2d12", // text-orange-900
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === order.status) {
      setShowStatusDropdown(false);
      return;
    }

    // For PickedUp status, open modal directly instead of confirmation
    if (newStatus === 'pickedup') {
      setShowStatusDropdown(false);
      setShowPickedUpModal(true);
      return;
    }

    setPendingStatusChange(newStatus);
    setShowConfirmationModal(true);
    setShowStatusDropdown(false);
  };

  const handleConfirmStatusChange = () => {
    if (onStatusChange && pendingStatusChange) {
      onStatusChange(order.id, pendingStatusChange);
    }
    setPendingStatusChange(null);
  };

  const handleCancelStatusChange = () => {
    setPendingStatusChange(null);
    setShowConfirmationModal(false);
  };

  const handlePickedUpClick = () => {
    setShowPickedUpModal(true);
  };

  const handlePickedUpModalClose = () => {
    setShowPickedUpModal(false);
  };

  const handlePickedUpStatusUpdate = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    };

    if (showStatusDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStatusDropdown]);
  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-2 md:px-3 py-3 text-sm text-black w-[12%] md:w-[10%]">
          <button
            onClick={() => onOrderClick(order)}
            className="text-indigo-600 hover:text-indigo-900 font-medium truncate block max-w-full"
          >
            {order.id}
          </button>
        </td>
        <td className="px-2 md:px-3 py-3 text-sm text-black w-[15%] md:w-[12%]">
          <div className="truncate">{order.dateTime}</div>
        </td>
        <td
          className="px-2 md:px-3 py-3 text-sm relative w-[20%] md:w-[18%]"
          onMouseEnter={() => onMouseEnter("buyer", index)}
          onMouseLeave={onMouseLeave}
        >
          <div className="flex items-center min-w-0">
            <img
              src={order.buyer.avatar}
              alt={order.buyer.name}
              className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 avatar"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-black truncate">
                {order.buyer.name}
              </div>
              <div className="text-xs text-gray-500 truncate">
                ID: {order.buyer.id}
              </div>
            </div>
          </div>
          {popoverInfo &&
            popoverInfo.type === "buyer" &&
            popoverInfo.index === index && (
              <TrackingPopover
                person={order.buyer}
                type="Buyer"
                isVisible
                onTrackClick={() => onOrderClick(order)}
              />
            )}
        </td>
        <td className="px-2 md:px-3 py-3 text-sm w-[16%] md:w-[15%]">
          <div className="text-black truncate truncate-cell" title={order.items.join(", ")}>
            {order.items.join(", ")}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(order.dateTime)}
          </div>
        </td>
        <td className="px-2 md:px-3 py-3 text-sm text-black w-[12%] md:w-[10%]">
          <div className="truncate">{order.deliveryDate}</div>
        </td>
        <td className="px-2 md:px-3 py-3 text-sm w-[15%] md:w-[13%]">
          <div
            className="text-black truncate leading-tight"
            title={order.destination}
          >
            {order.destination.split(",").map((part, index) => (
              <div
                key={index}
                className={index === 0 ? "font-medium" : "text-gray-600"}
              >
                {part.trim()}
              </div>
            ))}
          </div>
        </td>
        <td className="px-2 md:px-3 py-3 text-sm w-[12%] md:w-[10%] relative">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center justify-between w-full min-w-[100px] text-left md:min-w-[120px] status-dropdown group touch-manipulation active:scale-95 transition-transform duration-150"
              aria-haspopup="true"
              aria-expanded={showStatusDropdown}
              aria-label={`Change status from ${order.status}`}
            >
              <StatusBadge
                status={order.status.toLowerCase()}
                onClick={order.status.toLowerCase() === 'pickedup' ? handlePickedUpClick : undefined}
              >
                <div className="flex items-center gap-1">
                  <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      showStatusDropdown ? 'rotate-180' : ''
                    }`}
                    color={
                      statusIconColors[order.status.toLowerCase()] || "#374151"
                    }
                  />
                </div>
              </StatusBadge>
            </button>

            {showStatusDropdown && (
              <>
                {/* Mobile backdrop */}
                <div className="fixed inset-0 z-40 bg-black/10 md:hidden" onClick={() => setShowStatusDropdown(false)} />
                
                {/* Dropdown menu */}
                <div className="absolute top-full left-0 mt-2 min-w-[160px] w-max max-w-[200px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 status-dropdown-menu">
                  <div className="py-1 flex flex-col">
                    {statusOptions.map((status, index) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between whitespace-nowrap ${
                          order.status.toLowerCase() === status.toLowerCase()
                            ? 'text-pink-600 bg-pink-50 hover:bg-pink-100'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                      >
                        <span className="flex-grow text-left">
                          {status.charAt(0).toUpperCase() +
                            status.slice(1).replace(/\s+/g, " ")}
                        </span>
                        {order.status.toLowerCase() === status.toLowerCase() && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full ml-2 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </td>
        <td className="px-2 md:px-3 py-3 text-sm font-medium w-[8%] md:w-[7%]">
          <div className="flex items-center space-x-1 action-buttons">
            <button
              onClick={() => {
                // Handle download functionality
                console.log("Download invoice for:", order.id);
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
              title="Download Invoice"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOrderClick(order)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Handle send email functionality
                console.log("Send email for order:", order.id);
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Status Change Confirmation Modal */}
      {showConfirmationModal && (
        <StatusChangeConfirmationModal
          isOpen={showConfirmationModal}
          onClose={handleCancelStatusChange}
          onConfirm={handleConfirmStatusChange}
          currentStatus={order.status}
          newStatus={pendingStatusChange}
          orderInfo={order}
        />
      )}

      {/* PickedUp Modal */}
      {showPickedUpModal && (
        <PickedUpModal
          isOpen={showPickedUpModal}
          onClose={handlePickedUpModalClose}
          onStatusUpdate={handlePickedUpStatusUpdate}
          items={[
            { id: 1, name: "DJ Set" },
            { id: 2, name: "Speakers" },
            { id: 3, name: "Lighting Rig" },
          ]}
        />
      )}
    </>
  );
};

export default TrackingTableRow;
