import { LightningElement, track } from "lwc";

export default class OrderDetails extends LightningElement {
  @track activeTab = "items";

  order = {
    orderId: "ORD-2025-001",
    orderDate: "2025-06-15T10:30:00Z",
    orderStatus: "shipped",
    totalAmount: 99.97,
    currency: "USD",
    customer: {
      customerId: "CUST-001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0123",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      }
    },
    items: [
      {
        itemId: "ITEM-001",
        productName: "Performance Athletic T-Shirt",
        sku: "PTS-2025-001",
        quantity: 1,
        unitPrice: 39.99,
        totalPrice: 39.99,
        category: "Sportswear",
        status: "shipped",
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
      },
      {
        itemId: "ITEM-002",
        productName: "Compression Sports Shorts",
        sku: "CSS-2025-002",
        quantity: 2,
        unitPrice: 29.99,
        totalPrice: 59.98,
        category: "Sportswear",
        status: "arrived",
        imageUrl:
          "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400"
      }
    ],
    shipment: {
      shipmentId: "SHIP-001",
      carrier: "FedEx",
      trackingNumber: "1234567890123456",
      shippingMethod: "Standard",
      shippingCost: 9.99,
      estimatedDelivery: "2025-06-20T18:00:00Z",
      shippingAddress: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA"
      }
    }
  };

  handleStatusChange(event) {
    this.activeTab = event.target.dataset.tab;
  }

  get formattedOrderDate() {
    const date = new Date(this.order.orderDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  get isItemsTab() {
    return this.activeTab === "items";
  }

  get isShipmentsTab() {
    return this.activeTab === "shipments";
  }

  get isCustomerTab() {
    return this.activeTab === "customer";
  }

  get itemsClass() {
    return this.activeTab === "items" ? "status-tab active" : "status-tab";
  }

  get shipmentsClass() {
    return this.activeTab === "shipments" ? "status-tab active" : "status-tab";
  }

  get customerClass() {
    return this.activeTab === "customer" ? "status-tab active" : "status-tab";
  }
}
