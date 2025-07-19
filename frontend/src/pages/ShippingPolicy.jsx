import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping & Delivery Policy</h1>
      <p>We are committed to delivering your order in a timely manner. Please read our shipping policy below.</p>

      <h2 className="text-xl font-semibold mt-4">Shipping Time</h2>
      <p>Orders are processed within 2-3 business days and delivered within 5-7 business days depending on your location.</p>

      <h2 className="text-xl font-semibold mt-4">Shipping Charges</h2>
      <p>Shipping charges are calculated at checkout. Free shipping is available for orders above a certain amount.</p>

      <h2 className="text-xl font-semibold mt-4">International Shipping</h2>
      <p>We currently do not offer international shipping.</p>

      <h2 className="text-xl font-semibold mt-4">Lost or Damaged Shipments</h2>
      <p>If your package is lost or damaged, please contact us immediately with your order details.</p>

      <p className="mt-6">For shipping inquiries, email us at <strong>support@elabyaashima.com</strong>.</p>
    </div>
  );
};

export default ShippingPolicy;
