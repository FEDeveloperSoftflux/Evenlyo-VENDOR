import React, { useEffect } from "react";
import { X, Check, Clock, Truck, Package, User } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const TrackOrderModal = ({ isOpen, onClose, orderData }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !orderData) return null;

  const orderTimeline = [
    {
      id: 1,
      title: "Request Sent",
      description: "Client sent order request",
      status: "completed",
      date: "2025-01-07",
      time: "07:45",
      icon: User,
      actor: "Client",
    },
    {
      id: 2,
      title: "Order Accepted",
      description: "Vendor accepted the order",
      status: "completed",
      date: "2025-01-07",
      time: "09:00",
      icon: Check,
      actor: "Vendor",
    },
    {
      id: 3,
      title: "Picked Up",
      description: "Order picked up from location",
      status: "completed",
      date: "2025-01-14",
      time: "11:15",
      icon: Package,
      actor: "Driver",
    },
    {
      id: 4,
      title: "Delivered",
      description: "Order delivered to destination",
      status: "pending",
      date: null,
      time: "Pending",
      icon: Truck,
      actor: null,
    },
    {
      id: 5,
      title: "Received",
      description: "Client confirmed receipt",
      status: "pending",
      date: null,
      time: "Pending",
      icon: User,
      actor: null,
    },
    {
      id: 6,
      title: "Completed",
      description: "Total Price: $2100.00",
      status: "pending",
      date: null,
      time: "Pending",
      icon: Check,
      actor: null,
    },
  ];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-card max-w-lg w-full mx-auto transform transition-all duration-200 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-900"
            >
              Order Tracking - {orderData.id}
            </h2>
            <Badge status={orderData.status.toLowerCase()} className="mt-1">
              {orderData.status.charAt(0).toUpperCase() +
                orderData.status.slice(1)}
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white bg-primary-mid hover:text-black hover:bg-primary-mid rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-mid"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Order Information Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">
              Order Information
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium text-gray-900">
                  {orderData.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Client Name:</span>
                <span className="font-medium text-gray-900">
                  {orderData.buyer.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-900">
                  {orderData.buyer.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Date:</span>
                <span className="font-medium text-gray-900">
                  {orderData.deliveryDate}
                </span>
              </div>
            </div>
          </div>

          {/* Order Timeline Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Timeline
            </h3>

            <div className="relative">
              {orderTimeline.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = step.status === "completed";
                const isPending = step.status === "pending";
                const isLast = index === orderTimeline.length - 1;
                // Determine if the next step is completed for the connector line
                const nextStepCompleted =
                  !isLast && orderTimeline[index + 1].status === "completed";

                return (
                  <div key={step.id} className="relative flex items-start pb-6">
                    {/* Connector line - color depends on next step status */}
                    {!isLast && (
                      <div
                        className={`absolute left-4 top-8 w-0.5 h-20 ${
                          nextStepCompleted ? "bg-green-400" : "bg-gray-300"
                        }`}
                      ></div>
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isCompleted
                          ? "bg-green-100 text-green-600 border-green-200"
                          : isPending
                          ? "bg-gray-100 text-gray-400 border-gray-200"
                          : "bg-pink-100 text-pink-600 border-pink-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {step.title}
                        </h4>
                        {step.actor && (
                          <Badge
                            status={
                              step.actor === "Client"
                                ? "claim"
                                : step.actor === "Vendor"
                                ? "delivered"
                                : "on the way"
                            }
                            className="text-xs"
                          >
                            {step.actor}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {step.description}
                      </p>
                      {step.date ? (
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {step.date} {step.time}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.time}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Notes */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Progress Notes
            </h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <div className="flex items-start">
                <Clock className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
                <p className="text-sm text-yellow-800">
                  Order is in progress. Next phase will be marked as completed
                  once the current step is finished.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <Button
              type="button"
              variant="gradient"
              className="w-full sm:w-auto"
              onClick={() => {
                console.log("Download PDF for order:", orderData.id);
              }}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
