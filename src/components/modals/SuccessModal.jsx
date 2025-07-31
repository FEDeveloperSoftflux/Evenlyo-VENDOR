import React from 'react';
import { X, CheckCircle, Download, FileText, UserPlus, Package, CreditCard, Calendar, Settings } from 'lucide-react';
import Button from '../ui/Button';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Success!", 
  message = "Operation completed successfully",
  type = "default", // default, listing, category, role, stock, payment, export, booking, settings
  data = null,
  showSecondaryAction = false,
  secondaryActionText = "View Details",
  onSecondaryAction = null
}) => {
  if (!isOpen) return null;

  // Icon mapping based on success type
  const getIcon = () => {
    switch (type) {
      case 'listing':
        return <FileText className="h-8 w-8 text-green-600" />;
      case 'category':
        return <Package className="h-8 w-8 text-green-600" />;
      case 'role':
        return <UserPlus className="h-8 w-8 text-green-600" />;
      case 'stock':
        return <Package className="h-8 w-8 text-green-600" />;
      case 'payment':
        return <CreditCard className="h-8 w-8 text-green-600" />;
      case 'export':
        return <Download className="h-8 w-8 text-green-600" />;
      case 'booking':
        return <Calendar className="h-8 w-8 text-green-600" />;
      case 'settings':
        return <Settings className="h-8 w-8 text-green-600" />;
      default:
        return <CheckCircle className="h-8 w-8 text-green-600" />;
    }
  };

  // Get specific messages based on type
  const getTypeSpecificContent = () => {
    switch (type) {
      case 'listing':
        return {
          title: "Listing Created Successfully!",
          message: "Your new listing has been added and is now available for booking.",
          details: data && [
            { label: "Title", value: data.title },
            { label: "Category", value: data.mainCategory },
            { label: "Price", value: data.cost }
          ]
        };
      case 'category':
        return {
          title: "Categories Added Successfully!",
          message: "Selected categories have been added to your profile.",
          details: data && [
            { label: "Main Categories", value: data.mainCategories?.join(', ') },
            { label: "Sub Categories", value: data.subCategories?.join(', ') }
          ]
        };
      case 'role':
        return {
          title: "Role Created Successfully!",
          message: "New role has been created and user has been notified.",
          details: data && [
            { label: "Role Name", value: data.fullName },
            { label: "Email", value: data.email },
            { label: "Designation", value: data.designation }
          ]
        };
      case 'stock':
        return {
          title: "Stock Updated Successfully!",
          message: "Item stock has been updated in your inventory.",
          details: data && [
            { label: "Item", value: data.itemName || "Entertainment & Attractions" },
            { label: "Added Quantity", value: data.quantity },
            { label: "Total Stock", value: data.totalStock }
          ]
        };
      case 'payment':
        return {
          title: "Payment Processed Successfully!",
          message: "Your payment has been processed and invoice updated.",
          details: data && [
            { label: "Invoice ID", value: data.id },
            { label: "Amount", value: `$${data.amount}` },
            { label: "Payment Method", value: data.paymentMethod }
          ]
        };
      case 'export':
        return {
          title: "Report Exported Successfully!",
          message: "Your analytics report has been generated and downloaded.",
          details: data && [
            { label: "Report Date", value: data.reportDate },
            { label: "Total Earnings", value: data.totalEarning },
            { label: "File Format", value: "PDF" }
          ]
        };
      case 'booking':
        return {
          title: "Booking Action Completed!",
          message: data?.action === 'accepted' ? "Booking has been accepted successfully." : "Booking has been rejected with reason provided.",
          details: data && [
            { label: "Booking ID", value: data.id },
            { label: "Client", value: data.client },
            { label: "Status", value: data.action }
          ]
        };
      case 'settings':
        return {
          title: "Settings Updated Successfully!",
          message: "Your account settings have been updated.",
          details: null
        };
      case 'pickup':
        return {
          title: "Pickup Completed Successfully!",
          message: "Items have been rated and security fees claimed. Status updated to 'Complete'.",
          details: data && [
            { label: "Booking ID", value: data.id },
            { label: "Client", value: data.client },
            { label: "Items Rated", value: data.itemCount },
            { label: "New Status", value: "Complete" }
          ]
        };
      default:
        return { title, message, details: null };
    }
  };

  const content = getTypeSpecificContent();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white/95 backdrop-blur-md rounded-3xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-mid hover:bg-primary-to text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              {getIcon()}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {content.title}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {content.message}
            </p>

            {/* Details section */}
            {content.details && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900 mb-3">Details:</h4>
                <div className="space-y-2">
                  {content.details.map((detail, index) => (
                    detail.value && (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-gray-600">{detail.label}:</span>
                        <span className="text-sm font-medium text-gray-900">{detail.value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              {showSecondaryAction && onSecondaryAction && (
                <button
                  type="button"
                  onClick={onSecondaryAction}
                  className="flex-1 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 py-3 px-6 rounded-2xl text-sm font-semibold transition-colors"
                >
                  {secondaryActionText}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className={`${showSecondaryAction ? 'flex-1' : 'w-full'} bg-gradient-to-b from-[#FF295D] to-[#C817AE] py-3 px-6 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-all shadow-md`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
