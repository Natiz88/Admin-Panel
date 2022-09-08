import React from 'react';
import './billtable.css'
import {
    Label,
  
  } from "@windmill/react-ui";

const BillTable = () => {
  return (
    <div>
      <table className="w-full">
                <tr>
                  <th> <Label> S.N </Label> </th>
                  <th> <Label> Particulars </Label></th>
                  <th> <Label> Rate </Label></th>
                  <th> <Label> Discount </Label></th>
                  <th> <Label> Amount(Rs.) </Label></th>
                </tr>
                <tr>
                  <td rowSpan={2}>1</td>
                  <td colSpan={1}>
                  <Label> Business card name deepak katwal with color black <br />Discount: 200 </Label>
                  </td>
                  <td colSpan={1}>
                      <Label> 1.25 </Label>
                  </td >
                  <td colSpan={1}>
                      <Label> 10% </Label>
                  </td>
                  <td colSpan={1}>
                  <Label> 1200 </Label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={1}>
                       <Label>  transpotrt sk <br />
                        136 kg  </Label>
                  </td>
                  <td colSpan={1}></td>
                  <td colSpan={1}></td>
                  <td colSpan={1}>
                     <Label>  1200 </Label>
                  </td>
                </tr>
                <tr>
                    <td rowSpan={3} colSpan={2}>
                       <Label>  NPR One thousand only </Label>
                    </td>
                    <td  colSpan={2}>
                       <Label>  Net Total </Label>
                    </td>
                    <td  colSpan={1}>
                       <Label>  1200 </Label>
                    </td>
                </tr>
                <tr>
                    <td  colSpan={2}>
                       <Label> Tax 0%   </Label>
                    </td>
                    <td  colSpan={1}>
                        <Label> 00 </Label>
                    </td>
                </tr>
                <tr>
                    <td  colSpan={2}>
                       <Label>  Grand Total </Label>
                    </td>
                    <td  colSpan={1}>
                       <Label>  1200 </Label>
                    </td>
                </tr>
              </table>
    </div>
  )
}

export default BillTable
