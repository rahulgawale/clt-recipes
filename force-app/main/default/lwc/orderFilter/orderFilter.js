import { LightningElement, track, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class OrderFinder extends LightningElement {
  @track orderNumber = "";
  @track email = "";
  @track isLoading = false;
  @track isSubmitted = false;

  @api
  get value() {
    return this._value;
  }
  /**
   * @param  {} value
   */
  set value(value) {
    this._value = value;
  }

  connectedCallback() {
    // Initialize values if needed
    if (this.value) {
      this.orderNumber = this.value.orderNumber || "";
      this.email = this.value.email || "";
    }
  }

  handleInputChange(event) {
    event.stopPropagation();
    const { name, value } = event.target;
    this[name] = value;

    if (this.validateInputs()) {
      this.dispatchEvent(
        new CustomEvent("valuechange", {
          detail: {
            value: {
              orderNumber: this.orderNumber,
              email: this.email
            }
          }
        })
      );
    }
  }

  // Validate that at least one field is filled
  validateInputs() {
    const orderInput = this.template.querySelector('[data-id="orderNumber"]');
    const emailInput = this.template.querySelector('[data-id="email"]');

    // Clear any existing errors
    orderInput.setCustomValidity("");
    emailInput.setCustomValidity("");

    if (!this.orderNumber && !this.email) {
      const errorMessage =
        "Please enter either an order number or email address";
      orderInput.setCustomValidity(errorMessage);
      emailInput.setCustomValidity(errorMessage);
      orderInput.reportValidity();
      emailInput.reportValidity();
      return false;
    }

    return true;
  }

  // Handle search button click
  async handleSearch() {
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true;
    this.isSubmitted = true;

    try {
      // Simulate search operation
      await this.performSearch();

      // Show success toast
      const evt = new ShowToastEvent({
        title: "Search Complete",
        message: `Searching for order${this.orderNumber ? ` #${this.orderNumber}` : ""}${this.email ? ` with email ${this.email}` : ""}`,
        variant: "success",
        duration: 3000
      });
      this.dispatchEvent(evt);

      // Dispatch custom event with search criteria
      const searchEvent = new CustomEvent("ordersearch", {
        detail: {
          orderNumber: this.orderNumber,
          email: this.email
        }
      });
      this.dispatchEvent(searchEvent);
    } catch (error) {
      // Show error toast
      const evt = new ShowToastEvent({
        title: "Search Failed",
        message: "Unable to search for order. Please try again.",
        variant: "error",
        duration: 3000
      });
      this.dispatchEvent(evt);

      // Reset submitted state on error so user can try again
      this.isSubmitted = false;
    } finally {
      this.isLoading = false;
    }
  }

  // Simulate search operation
  performSearch() {
    return new Promise((resolve) => {
      // Simulate async operation
      resolve();
    });
  }

  // Handle clear button click
  handleClear() {
    this.orderNumber = "";
    this.email = "";
    this.isSubmitted = false;

    // Clear any validation errors
    const inputs = this.template.querySelectorAll("lightning-input");
    inputs.forEach((input) => {
      input.setCustomValidity("");
      input.reportValidity();
    });
  }

  // Getter for search button label
  get searchButtonLabel() {
    return this.isSubmitted ? "Submitted" : "Submit";
  }

  // Getter for search button disabled state
  get searchButtonDisabled() {
    return this.isLoading || this.isSubmitted;
  }
}
