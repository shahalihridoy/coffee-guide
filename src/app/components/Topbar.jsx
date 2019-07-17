import React from "react";
import { Icon, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Topbar = ({ title, previousPage, history }) => {
  return (
    <div className="topbar flex flex-middle flex-center w-100 box-shadow">
      {previousPage ? (
        <div
          className="flex flex-middle pl-4 h-100"
          onClick={() => history.goBack()}
        >
          <IconButton>
            <Icon className="text-primary">arrow_back</Icon>
          </IconButton>
          <h5 className="mb-0 capitalize text-primary">{previousPage}</h5>
        </div>
      ) : null}
      <h4 className="mb-0 capitalize">{title}</h4>
    </div>
  );
};

export default withRouter(Topbar);
