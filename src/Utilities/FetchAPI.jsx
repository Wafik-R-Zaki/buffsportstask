/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { get } from "../services/config";

/* const baseUrl = "http://localhost:8099/"; */

const FetchAPI = ({ url, children }) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetch = () => {
    setIsLoading(true);
    get(url).then(
      (response) => {
        console.log(response);
        setIsLoading(false);
        setData(response.data);
      })
      .catch(responseError => {
        setIsLoading(false);
        setError(responseError);
      });
  };

  const actions = {
    fetch
  };
  React.useEffect(() => {
    fetch();

    /* return () => {
      cleanup
    } */
  }, [url]);

  return (
    <>
      {children({ data, isLoading, error, actions })}
    </>
  );
};

export default FetchAPI;
