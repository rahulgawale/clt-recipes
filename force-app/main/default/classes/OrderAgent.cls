public with sharing class OrderAgent {
  @InvocableMethod(
    label='Show Order Details'
    description='Finds an order by customer email and order ID'
  )
  public static List<OrderResponse> findOrders(List<OrderRequest> req) {
    if (req == null || req.isEmpty()) {
      return new List<OrderResponse>();
    }

    OrderRequest request = req[0];
    OrderFilter filter = request.orderSearchFilter;

    System.debug('Order Filter: ' + filter);

    // For simplicity we are using order json.
    // in a real-world scenario, you would use SF OMS objects or
    // call an external service to retrieve the order details.
    Order orderObj = [
      SELECT Id, Order_Number__c, Customer_Email__c, Order_Raw_Payload__c
      FROM Order
      WHERE
        Order_Number__c = :filter.orderNumber
        OR Customer_Email__c = :filter.customerEmail
      ORDER BY CreatedDate DESC
      LIMIT 1
    ];

    System.debug('Order Object: ' + orderObj);

    if (orderObj == null) {
      return new List<OrderResponse>();
    }

    OrderDetails orderDetails = new OrderDetails(
      orderObj.Order_Number__c,
      orderObj.Order_Raw_Payload__c,
      orderObj.Id
    );

    OrderResponse orderResp = new OrderResponse();
    orderResp.order = orderDetails;

    return new List<OrderResponse>{ orderResp };
  }

  public class OrderRequest {
    @InvocableVariable
    public OrderFilter orderSearchFilter;
  }

  public class OrderFilter {
    @InvocableVariable
    public String orderNumber;
    @InvocableVariable
    public String customerEmail;
  }

  public class OrderDetails {
    @InvocableVariable
    public String orderNumber;
    @InvocableVariable
    public string orderRawJson;
    @InvocableVariable
    public Id orderId;

    public OrderDetails(String orderNumber, String orderRawJson, Id orderId) {
      this.orderNumber = orderNumber;
      this.orderRawJson = orderRawJson;
      this.orderId = orderId;
    }
  }

  public class OrderResponse {
    @InvocableVariable
    public OrderDetails order;
  }
}
