import React from "react";
import LineItemPage from ".";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { id: context.params.id },
  };
};

const LineItemWrapper = (props: {
  id: string;
}): React.ReactElement<any, any> => <LineItemPage {...props} />;

export default LineItemWrapper;
