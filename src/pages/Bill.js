import React from "react";

const Bill = () => {
  return (
    <div>
      <header className="flex justify-between h-12 w-full bg-red-400">
        <div>Date:</div>
        <img src="" alt="Logo" className="flex self-end" />
      </header>
      <div>
        <div>
          <h1 className="mb-2 font-medium text-xl ">Order Slip</h1>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <p>Bill No.:</p>
                <p>Payment:</p>
              </div>
              <div>
                <p>Date:</p>
                <p>Order ID:</p>
              </div>
              <div>
                <p>Name:</p>
                <p>Address:</p>
              </div>
            </div>
            <img src="" alt="Product Img" />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5">
            <div>S.N.</div>
            <div>Particulars</div>
            <div>Qty.</div>
            <div>Rate</div>
            <div>Amount(Rs.)</div>
          </div>
          <div className="grid grid-cols-5">
            <div>1</div>
            <div>
              <p>Product Name: Business Card - Both Side</p>
              <p>Product Code: B\C-S-BSBC-004</p>
              <p>Quantity: 1000</p>
              <p>Discount 0%:e</p>
              <p>Shipping Cost:</p>

            </div>
            <div>Qty.</div>
            <div>Rate</div>
            <div>Amount(Rs.)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
