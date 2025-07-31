import React, { useEffect } from "react";
import { X, Download } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const InvoiceModal = ({ invoice, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const modalElement = document.getElementById("invoice-modal");
    if (modalElement) {
      modalElement.focus();
    }
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    try {
      // Simulate PDF download
      console.log("Downloading invoice PDF...");
      // In a real app, this would trigger a PDF download
      // For now, we'll simulate a successful download
      const link = document.createElement("a");
      link.href = "#";
      link.download = `invoice-${invoice?.id || "unknown"}.pdf`;
      // Uncomment the line below when you have actual PDF generation
      // link.click();
      console.log("Invoice download initiated");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      alert("Error downloading invoice. Please try again.");
    }
  };

  // Create invoice data with safe defaults
  const defaultInvoiceData = {
    id: "INV-2024-001",
    date: "1/15/2024",
    dueDate: "2/14/2024",
    status: "paid",
    items: [
      {
        name: "DJ",
        description: "Premium Subscription",
        quantity: 2,
        securityFee: 25,
        kilometer: "10km",
        rate: 99.99,
        amount: 99.99,
      },
    ],
    subtotal: 99.99,
    tax: 0.0,
    securityFee: 25,
    kilometerFee: 2,
    total: 99.99,
    company: {
      name: "Your Company Name",
      address: "123 Business Street",
      cityState: "City, State 12345",
      email: "contact@company.com",
    },
    customer: {
      name: "Customer Name",
      email: "customer@email.com",
      address: "Customer Address",
    },
  };

  // Merge passed invoice with defaults, ensuring all required properties exist
  const invoiceData = {
    ...defaultInvoiceData,
    ...invoice,
    company: {
      ...defaultInvoiceData.company,
      ...(invoice?.company || {}),
    },
    customer: {
      ...defaultInvoiceData.customer,
      ...(invoice?.customer || {}),
    },
    items: invoice?.items || defaultInvoiceData.items,
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div
        id="invoice-modal"
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Invoice {invoiceData?.id || "N/A"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 md:gap-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Invoice
              </h3>
              <p className="text-sm text-gray-500">
                Invoice #{invoiceData?.id || "N/A"}
              </p>
            </div>
            <div className="text-left lg:text-right">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                {invoiceData?.company?.name || "Company Name"}
              </h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>{invoiceData?.company?.address || "Company Address"}</p>
                <p>{invoiceData?.company?.cityState || "City, State"}</p>
                <p>{invoiceData?.company?.email || "contact@company.com"}</p>
              </div>
            </div>
          </div>

          {/* Bill To & Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Bill To:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium">
                  {invoiceData?.customer?.name || "Customer Name"}
                </p>
                <p>{invoiceData?.customer?.email || "customer@email.com"}</p>
                <p>{invoiceData?.customer?.address || "Customer Address"}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Invoice Details:
              </h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {invoiceData?.date || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">
                    {invoiceData?.dueDate || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge status={invoiceData?.status || "unknown"}>
                    {invoiceData?.status === "paid"
                      ? "Paid"
                      : invoiceData?.status || "Unknown"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="min-w-full text-xs md:text-sm">
              <thead className="bg-pink-50 border-b border-gray-100">
                <tr>
                  <th className="px-2 md:px-4 py-3 text-left font-medium text-gray-600">
                    Items
                  </th>
                  <th className="px-2 md:px-4 py-3 text-left font-medium text-gray-600">
                    Description
                  </th>
                  <th className="px-2 md:px-4 py-3 text-center font-medium text-gray-600">
                    Qty
                  </th>
                  <th className="px-2 md:px-4 py-3 text-center font-medium text-gray-600">
                    Security
                  </th>
                  <th className="px-2 md:px-4 py-3 text-center font-medium text-gray-600">
                    KM
                  </th>
                  <th className="px-2 md:px-4 py-3 text-right font-medium text-gray-600">
                    Rate
                  </th>
                  <th className="px-2 md:px-4 py-3 text-right font-medium text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {(invoiceData.items || []).map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 md:px-4 py-3 font-medium">
                      {item?.name || "N/A"}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-gray-600">
                      <div>
                        <div className="font-medium">
                          {item?.description || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Monthly subscription service
                        </div>
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-center">
                      {item?.quantity || 0}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-center">
                      ${item?.securityFee || 0}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-center">
                      {item?.kilometer || "N/A"}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-right">
                      ${item?.rate || 0}
                    </td>
                    <td className="px-2 md:px-4 py-3 text-right font-medium">
                      ${item?.amount || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${invoiceData?.subtotal || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (0%):</span>
                  <span className="font-medium">${invoiceData?.tax || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Fee:</span>
                  <span className="font-medium">
                    ${invoiceData?.securityFee || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kilometer: 10km</span>
                  <span className="font-medium">
                    ${invoiceData?.kilometerFee || 0}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-semibold">
                  <span>Total:</span>
                  <span>${invoiceData?.total || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-200 flex justify-end">
          <Button
            variant="gradient"
            onClick={handleDownload}
            size="sm"
            className="px-4 md:px-6 py-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
