import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Select,
  Textarea,
} from "@windmill/react-ui";

import { MailIcon } from "../icons";

function Forms() {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <PageTitle>Forms</PageTitle>
      <SectionTitle>Elements</SectionTitle>

      <form
        onSubmit={submitHandler}
        className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <Label>
          <span>Name</span>
          <Input typ="name" className="mt-1" placeholder="Jane Doe" />
        </Label>
        <Label>
          <span>Email</span>
          <Input type="email" className="mt-1" placeholder="Jane Doe" />
        </Label>

        <Label className="mt-4">
          <span>Disabled</span>
          <Input disabled className="mt-1" placeholder="Jane Doe" />
        </Label>

        <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
          <Label>Account Type</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="personal" name="accountType" />
              <span className="ml-2">Personal</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="business" name="accountType" />
              <span className="ml-2">Business</span>
            </Label>
            <Label disabled className="ml-6" radio>
              <Input
                disabled
                type="radio"
                value="disabled"
                name="accountType"
              />
              <span className="ml-2">Disabled</span>
            </Label>
          </div>
        </div>

        <Label className="mt-4">
          <span>Requested Limit</span>
          <Select className="mt-1">
            <option>$1,000</option>
            <option>$5,000</option>
            <option>$10,000</option>
            <option>$25,000</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Multiselect</span>
          <Select className="mt-1" multiple>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            <option>Option 4</option>
            <option>Option 5</option>
          </Select>
        </Label>

        <Label className="mt-4">
          <span>Button right</span>
          <div className="relative text-gray-500 focus-within:text-purple-600">
            <input
              className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
            />
            <button className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Click
            </button>
          </div>
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

export default Forms;
