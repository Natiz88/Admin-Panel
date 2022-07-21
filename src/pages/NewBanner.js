import React from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Form,
  HelperText,
  Label,
  Button,
  Select,
  Textarea,
} from "@windmill/react-ui";

import PageTitle from "../components/Typography/PageTitle";

const NewBanner = () => {
  return (
    <div>
      <PageTitle>New Banner</PageTitle>
      <Button tag={Link} to="/app/banners">
        Cancel
      </Button>
      <form className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"></form>
    </div>
  );
};

export default NewBanner;
